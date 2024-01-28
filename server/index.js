const express = require("express")
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const studentAuthRoute = require("./Routes/studentAuth")
const adminAuthRoute = require("./Routes/adminAuth")
const bonofideRoute = require("./Routes/bonofides")
const allocatedListRoute = require("./Routes/allocatedList")
const employeeListRoute = require("./Routes/employeeList")
const ItemsRouter = require("./Routes/New_Item");
const billRoute = require("./Routes/billRoute");
const VendorRouter = require("./Routes/Vendors");
const RoomRouter = require("./Routes/RoomAlloc");
const HostleRouter = require("./Routes/Hostleinfo");
const newAllocRouter = require("./Routes/newAllocation");
//const generatebonofide=require("./Routes/generatebonofide")
const complaints = require("./Routes/complaints")
const bonofides = require("./Routes/bonofides")


app.use(express.json())
app.use(cors());
mongoose.connect("Mongo Uri", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connection succesful"))
    .catch(err => console.log(err))


app.use("/item", ItemsRouter)
app.use("/bills", billRoute);
app.use("/studentAuth", studentAuthRoute);
app.use("/adminAuth", adminAuthRoute);
app.use("/bonofide", bonofideRoute)
app.use("/allocatedList", allocatedListRoute)
app.use("/employeeList", employeeListRoute)
app.use("/vendor", VendorRouter);
app.use("/room", RoomRouter);
app.use("/hostel", HostleRouter);
//app.use("/generatebonofide",generatebonofide)
app.use("/complaints", complaints)
app.use("/bonofides", bonofides)
app.use("/newalloc", newAllocRouter)

app.listen(5000, () => {
    console.log("Server running")
})

