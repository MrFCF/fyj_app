<template>
	<div class="login">
		<h1>欢迎登陆保洁SFA系统</h1>
		<div class="top_hat"></div>
		<div class="login_box">
			<div class="logo_warp">
				<div class="logo_box"></div>				
			</div>
			<div class="input_group" :class="{active: act_index===1,error:errors.has('cno')}">
				<label for="cm_code">公司编号</label>
				<input name="cno" v-validate="{required:true,max:6,min:4}" @focus="act_index=1" type="number" id="cm_code" v-model="login.cm_code"/>
			</div>
			<div class="input_group" :class="{active: act_index===2,error:errors.has('pno')}">
				<label for="PNO">员工编号</label>
				<input name="pno" v-validate="{required:true,max:12,min:4}" @focus="act_index=2"  type="number" id="PNO" v-model="login.PNO"/>
			</div>
			<div class="input_group" :class="{active: act_index===3,error:errors.has('pwd')}">
				<label for="Passwd">登录密码</label>
				<input name="pwd" v-validate="{required:true,max:12,min:4}" @focus="act_index=3" type="password" id="passwd" v-model="login.passwd"/>
			</div>
			<div class="ck-row">
				<div class="ckbox_wrap" @click="remebeSet" :class="{'active':remebe}">
					<i class="iconfont " :class="{'icon-check-square': remebe, 'icon-border': !remebe}"></i>
					<span>记住密码</span>
				</div>
				<div class="ckbox_wrap" @click="autoLoginSet" :class="{'active':auto_login}">
					<i class="iconfont" :class="{'icon-check-square': auto_login, 'icon-border': !auto_login}"></i>
					<span>自动登录</span>
				</div>
			</div>
		</div>
		<div class="btn_warp" @click="loginBtnClick">
			<p>登录</p>
		</div>
	</div>
</template>

<script>
	import "../assets/font/iconfont.css"
	import { Indicator } from 'mint-ui'
	import { loginPost } from '../service/index'
	import { mapMutations } from 'vuex'
	export default{
		name:'login',
		data(){
			return{
				login:{
					cm_code:'',
					PNO:'',
					passwd:''
				},
				act_index:1,
				remebe:false,
				auto_login:false
			}
		},
		mounted(){
			let data = JSON.parse(localStorage.getItem("Login_data"));
			if(data){
				this.login.cm_code = data.cm_code
				this.login.PNO = data.PNO
				this.login.passwd = data.passwd
				this.remebe = data.remebe
				this.auto_login = data.auto_login
			}
			// 强制执行校验
			this.$validator.validate();
			// 自动登录
			if(this.auto_login){
				this.loginBtnClick();
			}
		},
		methods:{
			...mapMutations(["initUser"]),
			autoLoginSet(){
//				设置当前的auto_login为true或false
				this.auto_login = !this.auto_login
//				如果this.auto_login 为true 设置this.remebe 为true
				this.auto_login && (this.remebe = true )
			},
			remebeSet(){
				this.remebe = !this.remebe
//				如果this.remebe 为false 设置this.auto_login为false
				this.remebe || (this.auto_login = false)
			},
			loginBtnClick(){
				//this.errors.any();  boolean 如果有错误返回ture
				if(this.errors.any()){
					return;
				}
				// 弹出等待的遮罩层，防止二次点击
				Indicator.open('正在登陆...');
				// 发送ajax请求 
				loginPost(this.login).then(res =>{
						// 将用户信息存储到sessionStorage
						sessionStorage.setItem("LoginUser",JSON.stringify(res.data.user));
						sessionStorage.setItem("LoginToken",res.data.token	);
						// 记住用户密码
						localStorage.setItem("Login_data",JSON.stringify({
							remebe:this.remebe,
							auto_login:this.auto_login,
							PNO:this.remebe ? this.login.PNO : "",
							cm_code:this.remebe ? this.login.cm_code : "",
							passwd:this.remebe ? this.login.passwd : ""
						}));
						// 把当前的登陆的用户信息放到vuex
						// this.$store.commit('initUser', res.data.user);
						// 将 `this.initUser()` 映射为 `this.$store.commit('initUser')`
						this.initUser(res.data.user)
						// 跳转到主页
						this.$router.push("/home");
						// 关闭遮罩层
						Indicator.close();
				}).then(err =>{
						console.log('登录失败')
				})
			}
		}
	}
</script>
<style type="text/css">
	html,
	body,
	#app{
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	h1{
		text-align: center;
		font-size: px2rem(36);
		height: px2rem(36); 
		padding: px2rem(148-36-44) 0 px2rem(44) 0;
		line-height: px2rem(36);
		color: #fff;
	}
	.login{
		background-color: #2ade69;
		height: 100%;
		
		.top_hat{
			width: px2rem(573);
			height: px2rem(18);
			background-color: #eee;
			margin: 0 auto;
			border-radius:px2rem(18) px2rem(18) 0 0;
		}
		@mixin login_warp(){
			width: px2rem(600);
			background-color: #FFFFFF;
			border-radius: px2rem(20);
			margin: 0 auto;
		}
		.login_box{ 
			height: px2rem(836);
			@include login_warp();
			.logo_warp{
				padding: px2rem(80) 0;
				.logo_box{
					width: px2rem(190);
					height: px2rem(190);
					margin: 0 auto;
					background-image: url('./../assets/logo.jpg');
					background-size: cover;
				}
			}
			@mixin rowStyle(){
				padding: 0 px2rem(36);
				color: $text-color;
				width: px2rem(400);
			}
			.input_group{
				border:2px solid #e2e2e2;
				border-radius: px2rem(45);
				font-size: px2rem(30);
				line-height: px2rem(90);
				@include rowStyle();
				margin: 0 auto px2rem(30) auto;
				
				input{
					border: 0 none;
					font-size: $text-size-mid;
					line-height: px2rem(90);
					width: px2rem(200);
					padding-left: px2rem(10);
				}
			}
			.input_group.active{
				color: $act-color;
				border: 2px solid $act-color;
			}
			.input_group.error{
				color: red;
				border: 2px solid red;
			}
			.ck-row{
				font-size: $text-size;
				@include rowStyle();
				display: flex;
				justify-content: space-around;
				.ckbox_wrap{
					padding-top: px2rem(8);
					padding-left: px2rem(36);
					i::before{
						display: inline-block;
						line-height:px2rem(28);
						height: px2rem(28);
						font-size:px2rem(28);
					}
				}
			}
			.ckbox_wrap.active{
				color: $act-color;
			}
		}
		.btn_warp{
			@include login_warp();
			height: px2rem(100);
			text-align: center;
			line-height: px2rem(100);
			color: $act-color;
			font-size: $text-size-imp;
			margin-top: px2rem(20);
			font-weight: 700;
			letter-spacing: px2rem(10);
		}
	}
</style>