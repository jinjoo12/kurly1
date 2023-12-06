import React from 'react';
import './scss/sub6.scss';
import { useNavigate, useLocation, Link }  from  'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {signIn} from '../../reducer/signIn';
import {address} from '../../reducer/address';

export default function Sub6SignInComponent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state)

    const [state,setState] = React.useState({
        아이디:'',
        입력비밀번호:'',
        로그인정보: {}
        
    })

    

    

    const onChangeSigninId=(e)=>{
        
        setState({
            ...state,
            아이디:e.target.value
        })
    }

    const onChangeSigninPw=(e)=>{
        setState({
            ...state,
            입력비밀번호:e.target.value
        })
    }

    const onSubmitSignin=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId',state.아이디);
        formData.append('userPw', state.입력비밀번호);

        axios({
            url:'https://ljj4771.com/kurly/kurly_signin.php',
            method:'POST',
            data:formData
        })
        .then((res)=>{

            if(res.status===200){
                if(res.data!==''){
                    // 로그인 시작
                    // 3일간 로그인 유지하기
                    let toDay = new Date();
                    toDay.setDate(toDay.getDate() + 3);
                    // 상태관리 저장 
                    // 이름, 아이디, 휴대폰, 주소, 만료일
                    const obj = {
                        회원등급:'관리자',
                        아이디:res.data.아이디,
                        이름:res.data.이름,
                        휴대폰:res.data.휴대폰,
                        주소:res.data.주소,
                        만료일:toDay.getTime()
                    }
                    localStorage.setItem('KURLY_SIGNIN_DATA', JSON.stringify(obj));

                    // 리덕스 상태관리 저장

                    dispatch(signIn(obj));
                    dispatch(address(res.data.주소));
                    navigate('/index');
                }
            }
            
            
        })
        .catch((err)=>{
            console.log(err);
            console.log('전송실패');
        })
    }


    


    const onClickIdSearch=(e)=>{
        e.preventDefault();
        navigate('/sub6IdSearch');
    }
    const onClickPwSearch=(e)=>{
        e.preventDefault();
        navigate('/sub6PwSearch');
    }

    const onClickSignup=(e)=>{
        e.preventDefault();
        navigate('/sub5');
    }

    return (
        <main id='sub6' className='sub6'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title-text">로그인</h2>
                    </div>
                    
                    <div className="content sub6-content">
                       <form onSubmit={onSubmitSignin} autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="text" 
                                            name='userId' 
                                            id='userId'
                                            onChange={onChangeSigninId} 
                                            value={state.아이디}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="password" 
                                            name='userPw' 
                                            id='userPw' 
                                            onChange={onChangeSigninPw}
                                            value={state.입력비밀번호}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <span>
                                            <a href="!#" onClick={onClickIdSearch}>아이디 찾기</a>
                                            <i>|</i>
                                            <a href="!#" onClick={onClickPwSearch}>비밀번호 찾기</a>
                                        </span>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input type="submit" name='submitBtn' id='submitBtn' value={'로그인'} />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input type="button" name='signupBtn' id='signupBtn' value={'회원가입'} onClick={onClickSignup} />
                                    </div>
                                </li>
                            </ul>
                       </form>
                    </div>
                </div>
            </section>
        </main>
    );
};
