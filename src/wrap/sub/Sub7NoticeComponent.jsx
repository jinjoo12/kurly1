import React from 'react';
import './scss/sub7.scss';
import Sub7NoticeLeftComponent from './Sub7NoticeLeftComponent';
import Sub7NoticeComponentList from './Sub7NoticeComponentList';
import axios from 'axios';

export default function Sub7SignInComponent() {

    const [state,setState] = React.useState({
        공지사항:[]
    })

    React.useEffect(()=>{
        axios({
            url:'https://ljj4771.com/kurly/green_kurly_notice_table_select.php',
            method:'GET'
        })
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            console.log("AXIOS 성공");
            if(res.status===200){
                setState({
                    ...state,
                    공지사항:res.data
                })
            }
            
        })
        .catch((err)=>{
            console.log(err);
            console.log("AXIOS 실패");
        })
        return;
    },[])

    
    

    return (
        <main id='sub7'>
            <section id="section1">
                <div className="container">
                    <div className="content">
                        {/* left 박스 */}
                        <Sub7NoticeLeftComponent/>
                        {/* right 박스 */}
                        <Sub7NoticeComponentList 공지사항={state.공지사항}/>
                        
                    </div>
                </div>
            </section>
        </main>
    );
};
