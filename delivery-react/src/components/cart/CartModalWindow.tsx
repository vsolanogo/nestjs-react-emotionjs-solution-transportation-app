import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { css } from "@emotion/react";
import { SharedModalBackground } from "../shared";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../store/store";
import {
  nameUpdateOperation,
  emailUpdateOperation,
  phoneUpdateOperation,
  addressUpdateOperation,
  createOrderOperation,
  userCreateOperation,
  userDeleteErrorAction,
  createOrderStartAction,
  addressAddressGeometryUpdateAction,
} from "../../redux/delivery/deliveryActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  useUserError,
  useOrder,
  useCartShops,
} from "../../redux/selectors/selectorHooks";
import { Shop } from "../../models/DeliveryModels";
import { Loader } from "@googlemaps/js-api-loader";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

const EModal = styled.div`
  min-width: 15em;
  box-shadow: "1px 7px 20px 2px rgba(0, 0, 0, 0.4)";
  background-color: #fff;
  border-radius: 5px;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  max-height: 90vh;
  padding: 20px;
  width: 70vw;
  position: relative;

  @media (max-width: 900px) {
    width: 90vw;
  }
`;

export const CloseButton = styled.button`
  background: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 23' fill='none' stroke='%23fd7014' stroke-width='2' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M1.7071 1.0429l21 21'/%3E%3Cpath d='M1.2929 22.043l21-21'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 21px 21px;
  background-position: center;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  padding: 0px;
  transition: all 0.3s;
  right: 8px;
  top: 8px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 23' fill='none' stroke='%23fd7014' stroke-width='2' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M1.7071 1.0429l21 21'/%3E%3Cpath d='M1.2929 22.043l21-21'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 21px 21px;
    background-position: center;
  }
`;

export const EModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1300;
  visibility: hidden;

  &[data-openwindow="true"] {
    visibility: visible;
  }
`;

interface CartModalWindowProps {
  shopId: number;
  onWindowClose: () => void;
  openWindow: boolean;
}

const options = {
  componentRestrictions: { country: "us" },
  // fields: ["address_components", "geometry", "icon", "name"],
  fields: ["geometry"],
  types: ["geocode"],
};

const apikey = "AIzaSyCTIcGTHyhAKZ1qSSpmJOO6KZOvgGd83K8";
const loader = new Loader({
  apiKey: apikey,
  version: "weekly",
});

export const CartModalWindow: React.FC<CartModalWindowProps> = ({
  shopId,
  onWindowClose,
  openWindow,
}): JSX.Element => {
  const cartShops = useCartShops();
  const theShop: Shop | undefined = cartShops.find((i) => i.id == shopId);
  const dispatch = useAppDispatch();
  const userError = useUserError();
  const order = useOrder();
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const shopMarkerRef = useRef<google.maps.Marker | null>(null);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [clickedPlace, setClickedPlace] = useState<google.maps.LatLng | null>(
    null
  );

  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleConfirmOrder = (id) => {
    const dispatchAsync = async () => {
      await dispatch(userCreateOperation());
      await dispatch(createOrderOperation(id));
    };

    dispatchAsync();
  };

  const handleNameUpdate = (e) => {
    dispatch(nameUpdateOperation(e.target.value));
  };

  const handleEmailUpdate = (e) => {
    dispatch(emailUpdateOperation(e.target.value));
  };

  const handlePhoneUpdate = (e) => {
    dispatch(phoneUpdateOperation(e.target.value));
  };

  // const handleAddressUpdate = (e) => {
  // dispatch(addressUpdateOperation(e.target.value));
  // };

  const handleErrorClose = () => {
    dispatch(userDeleteErrorAction());
    onWindowClose();
  };

  const handleOrderClose = () => {
    dispatch(createOrderStartAction());
    onWindowClose();
  };

  useEffect(() => {
    const portalDiv = document.getElementById("map")!;

    loader
      .importLibrary("maps")
      .then(({ Map }) => {
        const map = new Map(portalDiv, {
          center: {
            lat: 0,
            lng: 0,
          },
          zoom: 10,
        });

        mapRef.current = map;

        const marker = new google.maps.Marker({
          position: { lat: 0, lng: 0 },
          map,
          icon: {
            path: faBasketShopping.icon[4] as string,
            fillColor: "#0000ff",
            fillOpacity: 1,
            anchor: new google.maps.Point(
              faBasketShopping.icon[0] / 2, // width
              faBasketShopping.icon[1] // height
            ),
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 0.075,
          },
        });
        shopMarkerRef.current = marker;
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    const shopLocation = {
      lat: parseFloat(theShop?.latitude.toString() ?? "0"),
      lng: parseFloat(theShop?.longitude.toString() ?? "0"),
    };

    if (mapRef.current) {
      mapRef.current.setCenter(new google.maps.LatLng(shopLocation));
    }

    if (shopMarkerRef.current) {
      shopMarkerRef.current.setPosition(shopLocation);
    }
  }, [theShop?.latitude, theShop?.longitude]);

  useEffect(() => {
    if (mapRef.current) {
      const clickListener = mapRef.current.addListener("click", (event) => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }

        setClickedPlace(event.latLng);
        setSelectedPlace(null);
      });

      return () => {
        google.maps.event.removeListener(clickListener);
      };
    }
  }, [mapRef?.current]);

  useEffect(() => {
    if (inputRef.current) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );

      autoCompleteRef.current.addListener("place_changed", () => {
        if (autoCompleteRef.current) {
          const place = autoCompleteRef.current.getPlace();

          dispatch(addressUpdateOperation(JSON.stringify(place)));

          if (
            place?.geometry?.location?.lat &&
            place?.geometry?.location?.lng
          ) {
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();

            dispatch(
              addressAddressGeometryUpdateAction({
                latitude,
                longitude,
              })
            );
          }

          setClickedPlace(null);
          setSelectedPlace(place);
        }
      });
    }
  }, [inputRef?.current]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    if (clickedPlace) {
      const marker = new google.maps.Marker({
        position: clickedPlace,
        map: mapRef.current,
      });
      markerRef.current = marker;

      dispatch(
        addressAddressGeometryUpdateAction({
          latitude: clickedPlace.lat(),
          longitude: clickedPlace.lng(),
        })
      );
    } else if (selectedPlace) {
      const marker = new google.maps.Marker({
        position: {
          lat: selectedPlace?.geometry?.location?.lat() || 0,
          lng: selectedPlace?.geometry?.location?.lng() || 0,
        },
        map: mapRef.current,
      });
      markerRef.current = marker;
    }
  }, [clickedPlace, selectedPlace]);

  return (
    <>
      {openWindow && (
        <>
          <SharedModalBackground />
          <Dialog onClose={handleErrorClose} open={!!userError}>
            <DialogTitle>{JSON.stringify(userError, undefined, 2)}</DialogTitle>
          </Dialog>
          <Dialog onClose={handleOrderClose} open={!!order}>
            <DialogTitle>{JSON.stringify(order, undefined, 2)}</DialogTitle>
          </Dialog>
        </>
      )}

      <EModalWrapper data-openwindow={openWindow}>
        <EModal>
          <CloseButton
            onClick={() => {
              onWindowClose();
            }}
          ></CloseButton>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Name"
                defaultValue=""
                size="small"
                onChange={handleNameUpdate}
              />

              <TextField
                required
                id="outlined-required"
                label="Email"
                defaultValue=""
                size="small"
                onChange={handleEmailUpdate}
              />

              <TextField
                required
                id="outlined-required"
                label="Phone"
                defaultValue=""
                size="small"
                onChange={handlePhoneUpdate}
              />

              <TextField
                required
                id="outlined-required"
                label="Address"
                defaultValue=""
                size="small"
                // onChange={handleAddressUpdate}
                inputRef={inputRef}
              />
            </div>
          </Box>

          <div
            id="map"
            style={{
              width: "100%",
              height: "800px",
            }}
          ></div>

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              handleConfirmOrder(shopId);
            }}
          >
            Confirm order
          </Button>
        </EModal>
      </EModalWrapper>
    </>
  );
};

// const we = {
//   address_components: [
//     {
//       long_name: "Hollywood",
//       short_name: "Hollywood",
//       types: ["locality", "political"],
//     },
//     {
//       long_name: "Broward County",
//       short_name: "Broward County",
//       types: ["administrative_area_level_2", "political"],
//     },
//     {
//       long_name: "Florida",
//       short_name: "FL",
//       types: ["administrative_area_level_1", "political"],
//     },
//     {
//       long_name: "United States",
//       short_name: "US",
//       types: ["country", "political"],
//     },
//   ],
//   geometry: {
//     location: { lat: 26.0112014, lng: -80.1494901 },
//     viewport: {
//       south: 25.98616792898462,
//       west: -80.24869005513406,
//       north: 26.09306387378846,
//       east: -80.10206591571134,
//     },
//   },
//   icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
//   name: "Hollywood",
//   html_attributions: [],
// };

// const wewe = {
//   address_components: [
//     { long_name: "Unit 1", short_name: "Unit 1", types: ["subpremise"] },
//     { long_name: "15210", short_name: "15210", types: ["street_number"] },
//     { long_name: "East 6th Avenue", short_name: "E 6th Ave", types: ["route"] },
//     {
//       long_name: "City Center North",
//       short_name: "City Center North",
//       types: ["neighborhood", "political"],
//     },
//     {
//       long_name: "Aurora",
//       short_name: "Aurora",
//       types: ["locality", "political"],
//     },
//     {
//       long_name: "Arapahoe County",
//       short_name: "Arapahoe County",
//       types: ["administrative_area_level_2", "political"],
//     },
//     {
//       long_name: "Colorado",
//       short_name: "CO",
//       types: ["administrative_area_level_1", "political"],
//     },
//     {
//       long_name: "United States",
//       short_name: "US",
//       types: ["country", "political"],
//     },
//     { long_name: "80011", short_name: "80011", types: ["postal_code"] },
//     { long_name: "8831", short_name: "8831", types: ["postal_code_suffix"] },
//   ],
//   geometry: {
//     location: { lat: 39.7247771, lng: -104.812572 },
//     viewport: {
//       south: 39.7234630197085,
//       west: -104.8138697802915,
//       north: 39.7261609802915,
//       east: -104.8111718197085,
//     },
//   },
//   icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
//   name: "231 Buckley Club (AA/NA MEETINGS)",
//   html_attributions: [],
// };
