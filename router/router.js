module.exports = app => {
    const controller = require("../controller/controller.js");
    const invisibledog_insert = require("../controller/invisibledog_insert.js");
    //const default_price = require("../controller/default_price.controller.js");
    //const custom_price = require("../controller/custom_price.controller.js");
    var router = require("express").Router();

    router.get("/find-the-invisible-dog", controller.invisibledog_game);
    router.post("/insert_invisibledog", invisibledog_insert.create);
    /*
    // map
    router.post("/signages", controller.signage_info);

    // schedule
    router.post("/schedule_info", controller.schedule_info);
    router.post("/test", controller.dummy_schedule);

    // dashboard
    router.post("/advertiser_count", controller.advertiser_count);
    router.post("/state_group", controller.signage_count_per_state);

    // default price
    router.post("/view_default_price", default_price.findOne);
    router.put("/update_default_price/:id", default_price.update);

    // custom price
    router.post("/custom_price", custom_price.create);
    router.post("/view_custom_price", custom_price.findOne);
    router.put("/update_custom_price/:id", custom_price.update);
    router.delete("/delete_custom_price/:id", custom_price.delete);
    */
    app.use("/campaigngames", router);
};