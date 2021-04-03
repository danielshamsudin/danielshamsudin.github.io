const { sequelize } = require("../models");
const db = require("../models");

/*
const Ads = db.Ads;
const AdsPackage = db.AdsPackage;
const AdsSchedule = db.AdsSchedule;
const SignageGroup = db.SignageGroup;
const Signage = db.Signage; 
const Advertiser = db.Advertiser;
const CustomPrice = db.CustomPrice;
const States = db.States;
const Schedule = db.Schedule;
*/

const path = require('path');
const invisibleDog_game = db.invisibledog_game;
const Op = db.Sequelize.Op;

exports.invisibledog_game = (req, res) => {
    invisibleDog_game.findAll({
        attributes: [
            'gameID',
            'user',
            'GUIs',
            'performance',
            'gameObj',
            'handDetection'
        ]
    })
        .then(data => {
            res.send({
                success: true,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message:
                    err.message || "Some error has occured. "
            });
        });
}


//exports.signage_count_per_state = (req, res) => {
//    States.findAll({ 
//        attributes: [
//            //'signage_id', 
//            'state', 
//            [sequelize.fn('COUNT', sequelize.col('signage_id')), 'quantity']
//        ], 
//        group: ['state']
//        //raw: true
//    })
//        .then(data => {
//            res.send({
//                success: true, 
//                data: data
//            });
//        }) 
//        .catch(err => {
//            res.status(500).send({
//                success: false, 
//                message: 
//                    err.message || "Some error has occured. "
//            });
//        });
//}
//
//exports.advertiser_count = (req, res) => {
//    Advertiser.count() 
//        .then(data => {
//            res.send({
//                success: true, 
//                data: data
//            });
//        }) 
//        .catch(err => {
//            res.status(500).send({
//                success: false, 
//                message: 
//                    err.message || "Some error has occured. "
//            });
//        });
//}
//
///*exports.slot_used = (req, res) => {
//    const start_month = req.body.start_month;
//    const end_month = req.body.end_month;
//    const year = req.body.year;
//    const start_date = year+"-"+start_month+"-01";
//    const end_date = year+"-"+end_month+"-01";
//
//    Schedule.findAll({
//        where: {
//            [Op.or]: [{ start_date: {[Op.between]: [start_date, end_date]} }, { end_date: {[Op.between]: [start_date, end_date]} }]
//        }
//    }) 
//        .then(data => {
//
//            // calculate here
//
//            res.send({
//                success: true, 
//                data: calculated
//            });
//        }) 
//        .catch(err => {
//            res.status(500).send({
//                success: false, 
//                message: 
//                    err.message || "Some error has occured. "
//            });
//        });
//};*/
//
//exports.signage_info = (req, res) => {
//    Signage.findAll({
//        attributes: [
//            'signage_id',
//            'name',
//            'group_id',
//            'longitude',
//            'latitude',
//            'location'
//        ], 
//        include: [{
//            model: CustomPrice, 
//            attributes: ['custom_price'] // [['custom_price', 'value']]
//        }]
//        
//    })
//        .then(data => {
//            res.send({
//                success: true, 
//                data: data
//            });
//        })
//        .catch(err => {
//            res.status(500).send({
//                success: false, 
//                message: 
//                    err.message || "Some error has occured. "
//            });
//        });
//};
//
//exports.schedule_info = (req, res) => { 
//    const signage_id = req.body.signage_id;
//    const start_month = req.body.start_month;
//    const end_month = req.body.end_month;
//    const year = req.body.year;
//    const start_date = year+"-"+start_month+"-01";
//    const end_date = year+"-"+end_month+"-01";
//
//    Signage.findByPk(signage_id, {
//        include: [{
//            model: SignageGroup, 
//            attributes: ['group_id']
//        }], 
//        where: {
//            signage_id: signage_id
//        }, 
//        attributes: []
//    })
//        .then(data => {
//            const group_id = data.SignageGroup.group_id;
//
//            Schedule.findAll({
//                where: {
//                    group_id: group_id, 
//                    [Op.or]: [{ start_date: {[Op.between]: [start_date, end_date]} }, { end_date: {[Op.between]: [start_date, end_date]} }]
//                }, 
//                attributes: [
//                    'schedule_id', 
//                    'group_id', 
//                    'start_date', 
//                    'end_date', 
//                    'time', 
//                    'ad_id', 
//                    'ad_name'
//                ]
//            }) 
//                .then(data => {
//                    res.send({
//                        success: true, 
//                        data: data
//                    })
//                }) 
//                .catch(err => {
//                    res.status(500).send({
//                        success: false, 
//                        message: 
//                            err.message || "Some error has occured. "
//                    });
//                });
//            
//        }) 
//        .catch(err => {
//            res.status(500).send({
//                success: false, 
//                message: 
//                    err.message || "Some error has occured. "
//            });
//        });
//};
//
//
//exports.dummy_schedule = (req, res) => {
//    res.send({
//        success: true, 
//        data: [
//            {
//                start_date: '2021-03-23',
//                end_date: '2021-03-25', 
//                time: ['13:00:00', '13:30:00', '14:00:00'], 
//                ad_id: ['34', '73', '156', '40'], 
//                ad_name: ['thirtyfour', 'seventhree', 'onefivesix', 'forty']
//            }, 
//            {
//                start_date: '2021-03-23',
//                end_date: '2021-03-25', 
//                time: ['11:00:00', '11:30:00', '12:00:00'], 
//                ad_id: ['34', '73', '40'], 
//                ad_name: ['thirtyfour', 'seventhree', 'forty']
//            }, 
//            {
//                start_date: '2021-03-23',
//                end_date: '2021-03-25', 
//                time: ['09:00:00', '09:30:00', '10:00:00'], 
//                ad_id: ['73', '156', '40'], 
//                ad_name: ['seventhree', 'onefivesix', 'forty']
//            }, 
//            {
//                start_date: '2021-03-24',
//                end_date: '2021-03-25', 
//                time: ['13:00:00', '13:30:00', '14:00:00'], 
//                ad_id: ['30'], 
//                ad_name: ['thirty']
//            }, 
//            {
//                start_date: '2021-03-25',
//                end_date: '2021-03-25', 
//                time: ['20:00:00', '20:30:00', '21:00:00'], 
//                ad_id: ['34', '73', '156', '40'], 
//                ad_name: ['thirtyfour', 'seventhree', 'onefivesix', 'forty']
//            }, 
//            {
//                start_date: '2021-03-23',
//                end_date: '2021-03-28', 
//                time: ['23:00:00', '23:30:00', '00:00:00'], 
//                ad_id: ['34', '73', '156'], 
//                ad_name: ['thirtyfour', 'seventhree', 'onefivesix']
//            }, 
//            {
//                start_date: '2021-03-23',
//                end_date: '2021-03-25', 
//                time: ['17:00:00', '17:30:00', '18:00:00'], 
//                ad_id: ['34', '73', '156', '40'], 
//                ad_name: ['thirtyfour', 'seventhree', 'onefivesix', 'forty']
//            }, 
//            {
//                start_date: '2021-03-23',
//                end_date: '2021-03-25', 
//                time: ['15:00:00', '15:30:00', '16:00:00'], 
//                ad_id: ['34', '73', '40'], 
//                ad_name: ['thirtyfour', 'seventhree', 'forty']
//            }, 
//            {
//                start_date: '2021-03-27',
//                end_date: '2021-03-28', 
//                time: ['13:00:00', '13:30:00', '14:00:00'], 
//                ad_id: ['35', '73', '158', '40'], 
//                ad_name: ['thirtyfive', 'seventhree', 'onefiveeight', 'forty']
//            }, 
//            {
//                start_date: '2021-03-25',
//                end_date: '2021-03-26', 
//                time: ['08:00:00', '08:30:00'], 
//                ad_id: ['34'], 
//                ad_name: ['thirtyfour']
//            }, 
//        ]
//    })
//}
//