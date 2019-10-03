'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/tag.test.js', () => {
  describe('tag 增删改，未登录', () => {
    const tempData = [];
    it('should POST /api/tags', async () => {
      const { Tag } = app.model;
      const temp = new Tag();
      tempData.push(temp);
      await app.httpRequest()
        .post('/api/tags')
        .set('Accept', 'application/json')
        .send(temp)
        .expect(401);
    });
    it('should DELETE /api/tags/:id', async () => {
      const { Tag } = app.model;
      const temp = new Tag();
      await app.httpRequest()
        .delete(`/api/tags/${temp._id}`)
        .set('Accept', 'application/json')
        .expect(401);
    });
    it('should PUT /api/tags/:id', async () => {
      const { Tag } = app.model;
      const temp = new Tag();
      tempData.push(temp);
      await app.httpRequest()
        .put(`/api/tags/${temp._id}`)
        .set('Accept', 'application/json')
        .send(temp)
        .expect(401);
    });
    after(async () => {
      const { Tag } = app.model;
      for (let i = 0; i < tempData.length; i++) {
        await Tag.deleteOne({ _id: tempData[i]._id.toString() });
      }
    });
  });
  describe('tag 增删改查，登录', () => {
    const tempData = [];

    it('should POST /api/tags', async () => {
      const { Tag } = app.model;
      const temp = new Tag({ name: Date.now() + '_name' });
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      const res = await app.httpRequest()
        .post('/api/tags')
        .set('Accept', 'application/json')
        .send(temp)
        .expect(201);
      assert(res.body && res.body.name === temp.name);
    });
    it('should GET /api/tags', async () => {
      const { Tag } = app.model;
      const temp = new Tag({ name: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      const res = await app.httpRequest()
        .get('/api/tags')
        .set('Accept', 'application/json')
        .expect(200);
      assert(res.body.list && res.body.list.constructor === Array);
      assert(res.body.total && res.body.total.constructor === Number);
      const tag = res.body.list[0];
      const keys = Object.keys(tag);
      assert(keys.find(v => v === 'name'));
      assert(keys.find(v => v === '_id'));
    });

    it('should GET /api/tags/:id', async () => {
      const { Tag } = app.model;
      const temp = new Tag({ name: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      const res = await app.httpRequest()
        .get(`/api/tags/${temp._id}`)
        .set('Accept', 'application/json')
        .expect(200);
      assert(res.body && res.body.name === temp.name);
    });
    it('should DELETE /api/tags/:id', async () => {
      const { Tag } = app.model;
      const temp = new Tag({ name: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      await app.httpRequest()
        .delete(`/api/tags/${temp._id}`)
        .set('Accept', 'application/json')
        .expect(204);
    });
    it('should PUT /api/tags/:id', async () => {
      const { Tag } = app.model;
      const temp = new Tag({ name: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      await app.httpRequest()
        .put(`/api/tags/${temp._id}`)
        .set('Accept', 'application/json')
        .send({
          name: 'test',
        })
        .expect(204);
    });
    after(async () => {
      const { Tag } = app.model;
      for (let i = 0; i < tempData.length; i++) {
        await Tag.deleteOne({ _id: tempData[i]._id.toString() });
      }
    });
  });
});
