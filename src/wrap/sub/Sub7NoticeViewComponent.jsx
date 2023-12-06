import React from 'react';
import './scss/sub7_view.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { confirmModal } from '../../reducer/confirmModal';
import { useDispatch,useSelector } from 'react-redux';

export default function Sub7NoticeViewComponent(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    // 컨펌모달창 함수
    const confirmModalMethod=(msg)=>{
        const obj = {
            isConfirmModal: true,
            confirmMsg: msg,
            회원가입완료: false
        }
        dispatch(confirmModal(obj));

        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }


    const location = useLocation();
    console.log(location);
    console.log(location.state);
    console.log(location.state.제목);
    console.log(location.state.내용);
    console.log(location.state.작성자);
    console.log(location.state.작성일);
    console.log(location.state.아이디);
    console.log(location.state.유형);


    const onClickList=(e)=>{
        e.preventDefault();
        navigate('/sub7');
    }

    const onClickUpdate=(e)=>{
        e.preventDefault();
        navigate('/sub7Update', {state: location.state});         // 업데이트 네비게이트
    }

    const onClickDelete=(e)=>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('idx',location.state.번호);
        
        axios({
            url:'https://ljj4771.com/kurly/green_kurly_notice_table_delete.php',
            method:'POST',
            data:formData
        })
        .then((res)=>{
            if(res.status===200){
                if(res.data===1){
                    confirmModalMethod('공지사항이 삭제가 완료되었습니다.');
                    navigate('/sub7');
                }
                else{
                    confirmModalMethod('공지사항 폼 내용을 확인하고 다시 시도해주세요.');
                }
            }
            
        })
        .catch((err)=>{
            console.log(err);
            console.log('AXIOS error');
        })
        navigate('/sub7');
    }

    return (
        <div id='sub7View'>
            <section id='section1'>
                <div className="container">
                    <div className="title">
                        <h2>공지사항</h2>
                        <h3>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</h3>
                    </div>
                    <div className="content">
                        <div className='view-box'>
                            <ul>
                                <li>
                                    <ul>
                                        <li>
                                            <div className="left">
                                                <strong>제목</strong>
                                            </div>
                                            <div className="right">
                                                <p>{location.state.제목}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="left">
                                                <strong>작성자</strong>
                                            </div>
                                            <div className="right">
                                                <p>{location.state.작성자}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="left">
                                                <strong>작성일</strong>
                                            </div>
                                            <div className="right">
                                                <p>{location.state.작성일}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <div className="gap">
                                        <div className="contents">
                                            {
                                                location.state.내용.split('<br />').map((item)=>{
                                                    return(
                                                        <p>{item}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='button-box'>
                        {
                            selector.signIn.로그인정보!==null && (
                                selector.signIn.로그인정보.회원등급==='관리자' && (
                                    <>
                                        <button type='button' onClick={onClickDelete}>삭제</button>
                                        <button type='button' onClick={onClickUpdate}>수정</button>
                                    </>
                                )
                            )
                        }                            
                            <button type='button' onClick={onClickList}>목록</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
