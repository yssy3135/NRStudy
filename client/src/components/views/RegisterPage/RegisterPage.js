import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action'



function RegisterPgage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }
    const onNameHandler = (event) =>{
        setName(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) =>{
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //리프레쉬를 막기위해서(안쓰고 누르면 리프레쉬)
        console.log('Email',Email)
        console.log('Password',Password)

        if(Password != ConfirmPassword){
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
        }

        let body = {
            email : Email,
            passwrod: Password,
            name:Name
        }


        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
                alert("회원가입에 성공했습니다.")
                props.history.push('/login');
            }else{
                alert('Filed to sign up')
            }
        })
   
        
 

    }



    
    return (
        <div style = {{
            display: 'flex', justifyContent: 'center' , alignItems:'center'
            ,width:'100%' ,height:'100vh'
        }}>
            <form style ={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <h2>회원가입</h2>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Name</label>            
                <input type="password" value={Name} onChange={onNameHandler} />
                <label>Password</label>            
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>            
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />          
                
                

                <br/>
                <button type ="submit">
                    회원가입
                </button>

            </form>
        </div>
    )
}

export default RegisterPgage