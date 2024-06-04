"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const uri = process.env.DBURL;
const apikey = process.env.SUPABASEKEY;
class database {
    constructor() {
        this.supabase = createClient(uri, apikey);
        this.table = "users";
    }
    getUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield this.supabase
                    .from(this.table)
                    .select("*")
                    .eq("id", username);
                return data;
            }
            catch (error) {
                return { error };
            }
        });
    }
    getRefreshtoken(refreshtoken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield this.supabase
                    .from(this.table)
                    .select("*")
                    .eq("refreshtoken", refreshtoken);
                return data;
            }
            catch (error) {
                return { error };
            }
        });
    }
    getbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield this.supabase
                    .from(this.table)
                    .select("*")
                    .eq("id", id);
                return data;
            }
            catch (error) {
                return false;
            }
        });
    }
    upsert(id, username, refreshtoken, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const r = yield this.supabase.from(this.table).upsert({
                    id,
                    username,
                    refreshtoken,
                    password,
                });
                if (r)
                    return r;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const Auth = new database();
module.exports = Auth;
