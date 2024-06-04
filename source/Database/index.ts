const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const uri = process.env.DBURL;
const apikey = process.env.SUPABASEKEY;
class database {
  private supabase: any;
  private table: string;
  constructor() {
    this.supabase = createClient(uri, apikey);
    this.table = "users";
  }
  async getUsername(username: string): Promise<Object> {
    try {
      const { data, error } = await this.supabase
        .from(this.table)
        .select("*")
        .eq("id", username);

      return data;
    } catch (error) {
      return { error };
    }
  }
  async getRefreshtoken(refreshtoken: string): Promise<Object> {
    try {
      const { data, error } = await this.supabase
        .from(this.table)
        .select("*")
        .eq("refreshtoken", refreshtoken);
      return data;
    } catch (error) {
      return { error };
    }
  }
  async getbyId(id: number): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from(this.table)
        .select("*")
        .eq("id", id);
      return data;
    } catch (error) {
      return false;
    }
  }
  async upsert(
    id: number,
    username: string,
    refreshtoken: string,
    password: string
  ): Promise<any> {
    try {
      const r = await this.supabase.from(this.table).upsert({
        id,
        username,
        refreshtoken,
        password,
      });
      if (r)return r
    } catch (error) {
      console.log(error);
    }
  }
}

const Auth = new database();
module.exports = Auth;
