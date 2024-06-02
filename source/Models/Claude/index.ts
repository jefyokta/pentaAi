const axios = require("axios");
require("dotenv").config();
interface Options {
  method: string;
  url: string;
  headers: any;
  data: {
    model: string;
    max_tokens: number;
    messages: [
      {
        role: string;
        content: string;
      }
    ];
  };
}

class ClaudeCLass {
  private claudekey: string | undefined;
  constructor() {
    this.claudekey = process.env.CLAUDEKEY;
  }
  private setopt(req: string): Options {
    let opt: Options;
    return (opt = {
      method: "POST",
      url: "https://claude-3.p.rapidapi.com/messages",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": this.claudekey,
        "X-RapidAPI-Host": "claude-3.p.rapidapi.com",
      },
      data: {
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: req,
          },
        ],
      },
    });
  }
  public async run(text: string): Promise<any> {
    try {
      const op = this.setopt(text);
      const res = await axios.request(op);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
const claude = new ClaudeCLass();
module.exports= claude
