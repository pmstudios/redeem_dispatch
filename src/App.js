import React, { Component } from 'react';
import './App.css';
import './index.css'

import dataMap from './RedeemCode_Dispatch.json';

const divStyle = {
  width: '100%',
  height: 'auto',
  backgroundImage: 'url(./images/Background.png)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

class App extends Component {
	state = {
		visibleDownloadLink: false,
		visibleError: false,
		redeemCode: "",
	}

	constructor(props){
		super(props);
		
		this.updateInput = this.updateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	updateInput(event){
		this.setState({redeemCode : event.target.value});
	}

	handleSubmit(){
		let result = dataMap.data.find(item => item === this.state.redeemCode);
		
		//console.log('Your input value is: ' + this.state.redeemCode);
		if (result)
		{
			this.setState({ 
				visibleDownloadLink: true,
				visibleError: false
			});
		}
		else
		{
			this.setState({ 
				visibleDownloadLink: false,
				visibleError: true
			});
		}
	}

	handleLink = () => {
		
	}

	renderDownloadLink = () => (
		<div className="redeem">
			<p>Download Link - <a href='TODO_DROPBOX_LINK' onClick={this.handleLink} target='_blank'>Download</a></p>
		</div>
	)
	
	renderErrorMsg = () => (
		<div className="errmsg">
			<p>Invalid Redeem Code</p>
		</div>
	)

	handleSignin = () => {
		
	}
	
	handleChange(e) {
		console.log(e);
		return;
		const { name, value } = e.target;
		if(name === 'code') 
			this.setState({ redeemCode: value });

		const { changeInput } = this.props;
		changeInput({ name, value });
	}

	render() {
		return (
			<div style={divStyle}>
				<div className="frame">
					<div className="top center">
						<img src={'./images/Logo.png'} alt='Dispatch SteelBook Edition' />
						<div className="title">
							<h1>Dispatch SteelBook Edition</h1>
							<h1>Bonus Digital Soundtrack Download</h1>
						</div>
					</div>
					<div className="middle center">
						<div className="text01">
							Thank you for purchasing Dispatch SteelBook Edition. This is the Downloadable Soundtrack page to redeem your <br/> 
							bonus voucher included with first print copies for Nintendo Switch, Nintendo Switch 2, and/or Xbox.
						</div>
						<div className="text02">
							**This is not to purchase the actual game. Please do not purchase this item as it is non-refundable<br/> 
							and only to download the digital soundtrack. The purpose of this page is for Downloadable voucher<br/> 
							redemption included with certain retail copies.**
						</div>
						<div className="text03">
							<div className="padding-l-32">
								Please note:<br/> 
								<br/>
								• Bonus vouchers are only available in first print copies and brand new factory sealed copies.<br/> 
								  We are not responsible for opened merchandise. <br/> 
								• Please download to your PC. <br/> 
								• A zip file containing sound files will be downloaded. <br/> 
								• Cannot be re-issued. No returns accepted, non-transferable unless stated otherwise.
							</div>
						</div>
						<div className="signup margin-b-16">
							<form>
								<h2>Enter Redeem Code</h2>
								<input type="text" name="code" placeholder="Redeem Code" onChange={this.updateInput} onKeyPress={this.updateInput} maxLength="10" required />
								<div onClick={this.handleSubmit} className="submit">
									<p>Submit</p>
								</div>
							</form>
						</div>
						{this.state.visibleError && this.renderErrorMsg()}
						{this.state.visibleDownloadLink && this.renderDownloadLink()}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
