import React, { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const route = useNavigate();

	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		localStorage.setItem('username', email.split('@')[0]);
		localStorage.setItem('token', password.split('').reverse().join(''));
		route("/");
	}

	React.useEffect(() => {
		localStorage.clear();
	}, []);
	
	return (
		<div className="login__container">
			<div className="login__leftComponent__logo">
				<img src="/img/logo.svg" alt="[logo]" />
			</div>
			<div className="login__leftComponent">
				<div className="login__leftComponent__loginImg">
					<img src="/img/sign-in.png" alt="Sign-in Image" />
				</div>
			</div>
			<div className="login__rightComponent">
				<div className="login__formContainer">
					<h2 className="login__title">Welcome</h2>
					<p className="login__subText">Enter details to login</p>
					<form className="login__form" autoComplete="off" onSubmit={handleSubmit}>
						<div className="login__form__input">
							<input type="email" name="email" placeholder='Email' required value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
						</div>
						<div className="login__form__input login__form__password">
							<input type={showPassword ? 'text' : 'password'} name="password" placeholder='Password' required value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
							<span onClick={() => setShowPassword(!showPassword)}>{ showPassword ? 'hide' : 'show' }</span>
						</div>
						<a href="#" className="login__form__forgotPassword">forgot password</a>
						<button className="login__form__btn">log in</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login;
