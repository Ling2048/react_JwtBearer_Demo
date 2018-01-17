import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface LoginModel {
    access_token: string;
    token_type: string;
}

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);//绑定在自己身上
    }
    componentDidMount() {
        let uid = (document.getElementById('txtUserId') as HTMLInputElement).value;
    }
    handleClick() {
        let uid = (this.refs["txtUserId"] as HTMLInputElement).value;
        let pwd = (this.refs["txtPwd"] as HTMLInputElement).value;
        let code = (this.refs["txtCode"] as HTMLInputElement).value;
        console.log("uid:" + uid + "|pwd:" + pwd + "|code:" + code);
        //document.cookie = "test=123";
        fetch('api/oauth/authenticate', {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "uid=" + uid + "&pwd=" + pwd + "&code=" + code
        })
            .then((response) => { return response.json() as Promise<LoginModel> })
            .then((data) => {
                console.log(data);
                sessionStorage.setItem("access_token", data.access_token);
                //localStorage.setItem("access_token", data.access_token);
                //console.log(document.cookie);
                this.props.history.push("/");
            });

    }

    public render() {
        return <div className="regcon">
            <div className="reglogo"><img width="300" height="83" /></div>
            <div className="cls"></div>
            <div className="logboxbg">
                <div className="regtt">会员登入</div>
                <div className="cls"></div>
                <div className="regde">
                    <div className="regtab"><input id="txtUserId" ref="txtUserId" name="txtUserId" type="text" className="txtreg1" placeholder="输入用户名" /></div>
                    <div className="regtab"><input id="txtPwd" ref="txtPwd" name="txtPwd" type="text" className="txtreg2" placeholder="输入密码" /></div>
                    <div className="regtab">
                        <span style={{ float: 'right' }}><img width="112" height="42" /></span>
                        <input id="txtCode" ref="txtCode" name="txtCode" type="text" className="txtreg3" placeholder="输入验证码" /></div>
                    <div className="regbtn"><a href="javascript:;" onClick={this.handleClick}>确认登录</a></div>
                    <div className="wangji"><a href='forgetpwd'>忘记密码？</a></div>

                </div>
            </div>
        </div>;
    }
}
