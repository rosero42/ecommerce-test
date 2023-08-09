import { useState } from "react"

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () =>{
    const [formField, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formField

    const handleChange = (event) =>{
        const {name, value} = event.target
        setFormFields({...formField, [name]: value})
    }
    return(
        <div>
            <h1>Sing up with your email and password</h1>
            <form onSubmit={() => {}}>
                <label>Display Name</label>
                <input 
                    type="text" 
                    required
                    name="displayName" 
                    onChange={handleChange}
                    value={displayName}/>

                <label>Email</label>
                <input 
                    type="email" 
                    required
                    name="email"
                    onChange={handleChange}
                    value={email}/>

                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    name="password" 
                    onChange={handleChange}
                    value={password}/>

                <label>Confirm Password</label>
                <input 
                    type="password" 
                    required 
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm