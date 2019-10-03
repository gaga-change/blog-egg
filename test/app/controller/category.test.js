'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/category.test.js', () => {
  describe('category 增删改，未登录', () => {
    const tempData = [];
    it('should POST /api/categories', async () => {
      const { Category } = app.model;
      const temp = new Category();
      tempData.push(temp);
      await app.httpRequest()
        .post('/api/categories')
        .set('Accept', 'application/json')
        .send(temp)
        .expect(401);
    });
    it('should DELETE /api/categories/:id', async () => {
      const { Category } = app.model;
      const temp = new Category();
      await app.httpRequest()
        .delete(`/api/categories/${temp._id}`)
        .set('Accept', 'application/json')
        .expect(401);
    });
    it('should PUT /api/categories/:id', async () => {
      const { Category } = app.model;
      const temp = new Category();
      tempData.push(temp);
      await app.httpRequest()
        .put(`/api/categories/${temp._id}`)
        .set('Accept', 'application/json')
        .send(temp)
        .expect(401);
    });
    after(async () => {
      const { Category } = app.model;
      for (let i = 0; i < tempData.length; i++) {
        await Category.deleteOne({ _id: tempData[i]._id.toString() });
      }
    });
  });
  describe('category 增删改查，登录', () => {
    const tempData = [];

    it('should POST /api/categories', async () => {
      const { Category } = app.model;
      const temp = new Category({ name: Date.now() + '_name' });
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      const res = await app.httpRequest()
        .post('/api/categories')
        .set('Accept', 'application/json')
        .send(temp)
        .expect(201);
      assert(res.body && res.body.name === temp.name);
    });
    it('should GET /api/categories', async () => {
      const { Category } = app.model;
      const temp = new Category({ name: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      const res = await app.httpRequest()
        .get('/api/categories')
        .set('Accept', 'application/json')
        .expect(200);
      assert(res.body.list && res.body.list.constructor === Array);
      assert(res.body.total && res.body.total.constructor === Number);
      const category = res.body.list[0];
      const keys = Object.keys(category);
      assert(keys.find(v => v === 'name'));
      assert(keys.find(v => v === '_id'));
    });

    it('should GET /api/categories/:id', async () => {
      const { Category } = app.model;
      const temp = new Category({ name: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      const res = await app.httpRequest()
        .get(`/api/categories/${temp._id}`)
        .set('Accept', 'application/json')
        .expect(200);
      assert(res.body && res.body.name === temp.name);
      const temp2 = new Category();
      await app.httpRequest()
        .get(`/api/categories/${temp2._id}`)
        .set('Accept', 'application/json')
        .expect({ message: '资源不存在' })
        .expect(404);
    });
    it('should DELETE /api/categories/:id', async () => {
      const { Category } = app.model;
      const temp = new Category({ name: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      await app.httpRequest()
        .delete(`/api/categories/${temp._id}`)
        .set('Accept', 'application/json')
        .expect(204);
      const temp2 = new Category();
      await app.httpRequest()
        .delete(`/api/categories/${temp2._id}`)
        .set('Accept', 'application/json')
        .expect({ message: '资源不存在' })
        .expect(404);
    });
    it('should PUT /api/categories/:id', async () => {
      const { Category } = app.model;
      const temp = new Category({ name: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      await app.httpRequest()
        .put(`/api/categories/${temp._id}`)
        .set('Accept', 'application/json')
        .send({
          name: 'test',
        })
        .expect(204);
      const temp2 = new Category();
      await app.httpRequest()
        .put(`/api/categories/${temp2._id}`)
        .set('Accept', 'application/json')
        .send({
          name: 'test',
        })
        .expect({ message: '资源不存在' })
        .expect(404);
    });
    after(async () => {
      const { Category } = app.model;
      for (let i = 0; i < tempData.length; i++) {
        await Category.deleteOne({ _id: tempData[i]._id.toString() });
      }
    });
  });
});
