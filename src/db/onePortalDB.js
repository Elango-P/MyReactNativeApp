
import ProductIndexSQLQuery from "./productIndex";
import transferSQLQuery from "./transfer";
import transferProductSQLQuery from "./transferProduct";

import stockEntrySQLQuery from "./stockEntry";
import stockEntryProductSQLQuery from "./stockEntryProduct";

import orderSQLQuery from "./order";
import orderProductSQLQuery from "./orderProduct";

import OnePortalDB from "../lib/SQLLiteDB";

import BluetoothSetting from "./bluetoothSetting";

import ProductPrice from "./productPrice";

import Status from "./status";
import OrderType from "./orderType";


class onePortalDB {
    

    static async create() {
        
        
        await OnePortalDB.dropTableIfExists("product_index");

        await OnePortalDB.dropTableIfExists("status");

        await OnePortalDB.dropTableIfExists("product_price");

        await OnePortalDB.dropTableIfExists("order_type");


        try {

            // //create product index table
            await OnePortalDB.runQuery(ProductIndexSQLQuery.CREATE_PRODUCT_INDEX_TABLE);

            // //create transfer table
            await OnePortalDB.runQuery(transferSQLQuery.CREATE_TRANSFER_TABLE);

            // //create transfer table
            await OnePortalDB.runQuery(transferProductSQLQuery.CREATE_TRANSFER_PRODUCT_TABLE);

            // //create stock entry
            await OnePortalDB.runQuery(stockEntrySQLQuery.CREATE_STOCK_ENTRY_TABLE);

            // //create stock entry product
            await OnePortalDB.runQuery(stockEntryProductSQLQuery.CREATE_STOCK_ENTRY_PRODUCT_TABLE);

            // //create order table
            await OnePortalDB.runQuery(orderSQLQuery.CREATE_ORDER_TABLE);

            // //create order product table
            await OnePortalDB.runQuery(orderProductSQLQuery.CREATE_ORDER_PRODUCT_TABLE);

            // //create order product table
            await OnePortalDB.runQuery(BluetoothSetting.CREATE_SETTINGS_TABLE);

            // //create product price table
            await OnePortalDB.runQuery(ProductPrice.CREATE_PRODUCT_PRICE_TABLE);
            
            // //create status table
            await OnePortalDB.runQuery(Status.CREATE_PRODUCT_STATUS_TABLE);

             //create Order Type table
             await OnePortalDB.runQuery(OrderType.CREATE_ORDER_TYPE_TABLE);


        } catch (err) {
            console.log(err);
        }
    }
}

export default onePortalDB;