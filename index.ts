import { MongoClient, FindOptions, ObjectId, UpdateFilter,DeleteOptions } from 'mongodb'

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'ts-lego-shuangyue'

// 研究一下索引
async function main() {
  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection<{age:number, type: string,name:string }>('work')
    // const result = await collection.find({_id:new ObjectId('61cc023fb14f479d96cd74a1')}).explain()
    // const result = await collection.createIndex({name:1}) // 创建索引， 索引名称  值为 1 、-1 表示正序和倒叙的索引
    // const result = await collection.find({_id:new ObjectId('61cc023fb14f479d96cd74a1')}).explain()

    // const dropResult = await collection.dropIndex('name_1')
    // console.log(dropResult);
    const listResult = await collection.listIndexes().toArray()
    console.log(listResult);
    
    
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}

main()
