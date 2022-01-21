import { MongoClient, FindOptions, ObjectId, UpdateFilter,DeleteOptions } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'ts-lego-shuangyue'

async function main() {
  try {
    await client.connect()
    console.log('Connected successfully to server')

    const db = client.db(dbName)

    // 测试链接
    const res = await db.command({ ping: 1 })
    console.log(res)

    const collection = db.collection<{age:number, bobbies: Array<string> }>('work')

    // 插入一条数据
    // const result11 = await collection.insertOne({name:'dabao',age:'12'})
    // console.log(result11);

    // 插入一批数据 使用数组的形式
    // const insertArray = [
    //   {name:'xiaobao',age:10},
    //   {name:'laobao',age:40}
    // ]
    // const resultArray = await collection.insertMany(insertArray)
    // console.log(resultArray);

    // 查找
    // const findResult = await collection.findOne({name:'dabao'})
    // console.log(findResult);

    // 查找所有的方法
    // const curosr = collection.find()
    // find 方法返回的是cursor 我们有两种方式拿到数据 没有返回值
    // 1、forEach
    // await curosr.forEach(doc=> console.log(doc))

    // 2、toArray 是一个promise 方法 返回一个数组
    // const allResult = await collection.find().toArray()
    // console.log(allResult);

    // 比较操作符
    // - $gt 大于
    // - $lt 小于
    // - $gte 大于等于
    // - $lte 小于等于
    // - $eq 等于
    // - $neq 不等于
    // const results = await collection.find({name:{$eq:'dabao'}}).toArray()
    // console.log(results);

    // 逻辑操作符
    // 逻辑与 $and  两种条件，一般就这么查
    // const results = await collection.find({age:{$gte:30},name:'laobao'}).toArray()
    // console.log('逻辑与',results);
    // 逻辑或 $or
    // const condition = {
    //   $or:[
    //     {age:{$gt:30}},
    //     {name:"xiaobao"}
    //   ]
    // }
    // const resultsOr = await collection.find(condition).toArray()
    // console.log('逻辑或',resultsOr);

    // element operator 操作符
    // $exists 存在
    // const result = await collection.find({age:{$exists: true}}).toArray()
    // console.log(result);
    // $type 类型
    // number 是一系列数字类型的集合
    // const result = await collection.find({age:{$type: 'number'}}).toArray()
    // console.log(result);

    // 查找参数
    // const findoptions: FindOptions = {
    //   limit: 2, // limit 和 skip 实现分页
    //   skip: 0,
    //   sort: {
    //     age: -1, // 1 代表升序 -1 代表降序
    //   },
    //   projection: {
    //     _id: 0, // 设置字段不展示 如果不把_id 排除。则默认会把 _id 返回
    //     name: 1,
    //   },
    // }
    // const result = await collection
    //   .find({ age: { $type: 'number' } }, findoptions)
    //   .toArray()
    // console.log(result)

    // 数据更新
    // replace --> put 数据替换
    // update --> patch 数据更新

    // const result = await collection.replaceOne(
    //   { name: 'laobao' },
    //   { name: 'wudabao1', age: 234 }
    // )
    // console.log(result);

    // 更新条件
    // const updateFilter1: UpdateFilter<{
    //   name: string
    //   age: number
    //   bobbies: Array<string>
    // }> = {
    //   $set:{
    //     name:'leborn'
    //   },
    //   $inc:{ // 自增
    //     age: 1 // 增加
    //   },
    //   $push:{ // 对数组类型的数据尾部插入数据，如果这个字段不存在，则初始化并插入
    //     // bobbies: 'golf', // 只能插入一个数据
    //     bobbies:{
    //       $each :['read','swim'], // 使用$each 插入多个数据，都是插入到尾部，
    //       $position: 0 // 需要搭配 $each 使用
    //     }
    //   },
    //   $pop : { // 删除指定位置
    //     bobbies : 1 // 1和 -1 表示队列的头和尾 删除
    //   },
    //   $pull:{ //删除指定字符串
    //     bobbies : 'read'
    //   },
    //   //使用set 更新数组指定下标的值
    //   $set:{
    //     "bobbies.0": "papapa"
    //   }
    // }
    // const updateDoc = await collection.updateOne({_id: new ObjectId('61cbd1149931955c21be5416')},updateFilter1)
    // console.log(updateDoc);

    // 使用数组类型查找数据
    // 1、值为数组中的某个元素 {bobbies:"papapa"}
    // 2、使用 $all 操作符，值为数组中的某一个属性，含义为包含关系
    //  {bobbies:{
    //    $all: ["papapa"]
    //  }}
    // 3、使用$regex 正则操作符
    // {bobbies:{
    //   $regex : /papa/g
    // }}
    // const arrFilter = await collection
    //   .find({
    //     bobbies: {
    //       $regex: /papa/g,
    //     },
    //   })
    //   .toArray()
    // console.log(arrFilter)

    // 更新数组中特定的值，mongod 提供了一个叫做 $ 的占位符。可以传入到 updateFilter1 中去 ，当使用  “bobbies.$” 时，内部会遍历$的值并找到下标填写到 $ 的位置。
    // const updateFilter1:UpdateFilter<{bobbies:string[]}> = {
    //   $set:{
    //     "bobbies.$": "papapapa-111"
    //   }
    // }
    // const updateDoc = await collection.updateOne({_id: new ObjectId('61cbd1149931955c21be5416'),bobbies:"papapa"},updateFilter1)
    // console.log(updateDoc);
    
    // 删除操作
    // const result = await collection.deleteOne({name:'dabao1'})
    // const result = await collection.deleteMany({age:{$gt:10}})
    // console.log(result);
    
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}

main()
