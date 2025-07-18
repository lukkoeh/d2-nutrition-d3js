import express from "express";
import cors from "cors"
import { SQL } from "bun"

const app = express()
const port = 3000

const sql = new SQL("postgres://postgres:root@localhost:5432/postgres")
app.use(cors())

await sql`SET search_path TO d2`

app.get("/areas", async (_, res) => {
  const result = await sql`SELECT DISTINCT area FROM all_data`
  res.send(result)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
