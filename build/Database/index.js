import { __awaiter } from "tslib";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
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
export default Auth;
