import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as assert from 'assert';
import { AppModule } from './../src/app.module';

let app: INestApplication;

const shopName = 'Random Shop';
const productName = 'Random Product';
const randomImage = 'https:';
const randomPrice = 712;
const randomCalories = 432;

const testShopPost = (str = undefined) =>
  request(app.getHttpServer())
    .post('/shop')
    .send({
      shopName: str ? str : shopName,
      latitude: 33.942,
      longitude: -118.2717,
    })
    .expect(201);

const testProductPost = (shopid: number) =>
  request(app.getHttpServer())
    .post('/product')
    .send({
      productName: productName,
      price: randomPrice,
      calories: randomCalories,
      image: randomImage,
      shop: shopid,
      latitude: 33.9829,
      longitude: -118.3338,
    })
    .expect(201)
    .then((res) => {
      assert(res.body.productName, productName);
      assert(res.body.price, randomPrice.toString());
      assert(res.body.calories, randomCalories.toString());
      assert(res.body.image, randomImage);
      expect(res.body.shop.id).toBeDefined();
      assert(res.body.shop.shopName, shopName);
      expect(res.body.id).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      expect(res.body.updatedAt).toBeDefined();
    });

const testEmailPost = (email: string) => {
  const userName = 'user name';
  const phone = '+380 123 456 78';
  const address = 'i live here';

  return request(app.getHttpServer())
    .post('/user')
    .send({
      userName: userName,
      phone: phone,
      email: email,
      address: address,
    })
    .expect(201)
    .then((res) => {
      assert(res.body.userName, userName);
      assert(res.body.phone, phone);
      assert(res.body.email, email);
      assert(res.body.address, address);

      expect(res.body.id).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      expect(res.body.updatedAt).toBeDefined();
    });
};

interface OrderItemsProps {
  productId: number;
  quantity: number;
}

const testOrderPost = (
  userId: number,
  orderItems: Array<OrderItemsProps>,
  latitude: number,
  longitude: number,
) => {
  return request(app.getHttpServer())
    .post('/order')
    .send({
      userId,
      orderItems,
      latitude,
      longitude,
    })
    .expect(201)
    .then((res) => {
      assert(res.body.user.id, userId.toString());
      expect(res.body.orderItems[0].id).toBeDefined();
      expect(res.body.orderItems[1].id).toBeDefined();

      expect(res.body.id).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
      expect(res.body.updatedAt).toBeDefined();
    });
};

describe('Shop (e2e)', () => {
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/shop (POST)', async () => {
    const res = await testShopPost();

    assert(res.body.shopName, shopName);
    expect(res.body.id).toBeDefined();
    assert(res.body.id, '1');
  });
});

describe('Product (e2e)', () => {
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/product (POST)', async () => {
    const res = await testShopPost();

    assert(res.body.shopName, shopName);
    expect(res.body.id).toBeDefined();
    assert(res.body.id, '1');

    await testProductPost(1);
  });

  it('/shop/:id/products (GET)', async () => {
    const res = await testShopPost();

    assert(res.body.shopName, shopName);
    expect(res.body.id).toBeDefined();

    assert(res.body.id, '1');

    await testShopPost('second');
    await testProductPost(1);
    await testProductPost(1);
    await testProductPost(2);

    request(app.getHttpServer())
      .get('/shop/1/products')
      .expect(200)
      .then((res) => {
        assert(res.body.length, '2');
        assert(res.body[0].id, '1');
        assert(res.body[1].id, '2');
      });
  });

  it('/order (POST)', async () => {
    const res = await testShopPost();

    assert(res.body.shopName, shopName);
    expect(res.body.id).toBeDefined();

    assert(res.body.id, '1');

    await testShopPost('second');
    await testProductPost(1);
    await testProductPost(1);
    await testProductPost(2);

    request(app.getHttpServer())
      .get('/shop/1/products')
      .expect(200)
      .then((res) => {
        assert(res.body.length, '2');
        assert(res.body[0].id, '1');
        assert(res.body[1].id, '2');
      });

    await testEmailPost('testmail@gmail.com');
    await testEmailPost('testmail2@gmail.com');

    await testOrderPost(
      1,
      [
        { productId: 1, quantity: 3 },
        { productId: 2, quantity: 1 },
      ],
      34.0454,
      -118.3157,
    );
  });
});
