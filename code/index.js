const { http } = require('@serverless-devs/dk');
let mock_data = [{ id: 1, name: "张三" }, { id: 2, name: "李四" }]
http
  .get("/collection", (ctx) => { // 查询全部资源
    ctx.body = mock_data;
  })
  .get("/collection/:id", (ctx) => { // 按照编号查询资源
    const { id } = ctx.params;
    const current_user = mock_data.filter((item) => item.id == id);
    ctx.body = current_user;
  })
  .post("/collection", (ctx) => { // 新增资源
    const { body = {} } = ctx.request;
    const { id, name } = body;
    let user_exists = false;
    mock_data.forEach((item) => {
      if (item.id == id) {
        user_exists = true;
      }
    });
    if (!user_exists) {
      mock_data.push({
        id, name
      });
    }
    ctx.body = mock_data;
  })
  .put("/collection/resource", (ctx) => { // 更新资源
    const { body = {} } = ctx.request;
    const { id, name } = body;
    mock_data  = mock_data.map((item)=>{
      if(item.id == id) {
        return {
          id,name
        }
      }
      return item;
    })
    ctx.body = mock_data;
  })
  .delete("/collection/:id", (ctx) => { // 删除资源
    const { id } = ctx.params;
    const remaining_user = mock_data.filter((item) => item.id != id);
    ctx.body = remaining_user;
  })
  .get("/", async (ctx, next) => {
    ctx.body = "Hello World!";
  })

http.app.use(http.routes());

exports.handler = http();