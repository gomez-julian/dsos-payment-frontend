import React from "react";
import "../styles/bootstrap.min.css";
import "../styles/NikeNav.css";
import { Link } from 'react-router-dom';
import { Fetch } from "../utilities/fetch";
import { Host } from "../Host";

export const NikeNav = (props) => {
  const {cart, setShow, active, setActive} = props
  const [user, setUser] = React.useState('Hola')

  React.useEffect(() => {
    console.log('Renderizando NikeNav...');
    const jwt = localStorage.getItem("jwt");
    if(jwt !== null && jwt.length > 1){
        Fetch(Host.auth.verify + jwt, 'POST', {}).then((r) => {
            if (r.status === 200) {
                setUser(localStorage.getItem("user"))
                setActive(true)
                console.log(jwt)
            } else {
              localStorage.setItem('jwt','')
            }
          })
          .catch((e) => {
            console.log(e);
          });
    }
    
  },[setActive, setUser])

  const logout = () => {
    localStorage.setItem('jwt','')
    setUser('Hola')
    setActive(false)
}

  return (
    <header>
    <nav className="pre-l-brand-header">
            <ul className="left">
                    <li className=".li-nav"> <svg className="padding" height="24px" width="24px" fill="#111" viewBox="0 0 26 32"><path d="M14.4 5.52v-.08q0-.56.36-1t.92-.44 1 .36.48.96-.36 1-.96.4l-.24.08.08.12-.08.44-.16 1.28q.08.08.08.16l-.16.8q-.08.16-.16.24l-.08.32q-.16.64-.28 1.04t-.2.64V12q-.08.4-.12.64t-.28.8q-.16.32 0 1.04l.08.08q0 .24.2.56t.2.56q.08 1.6-.24 2.72l.16.48q.96.48.56 1.04l.4.16q.96.48 1.36.84t.8.76q.32.08.48.24l.24.08q1.68 1.12 3.36 2.72l.32.24v.08l-.08.16.24.16h.08q.24.16.32.16h.08q.08 0 .16-.08l.16-.08q.16-.16.32-.24h.32q.08 0 0 .08l-.32.16-.4.48h.56l.56.08q.24-.08.4-.16l.4-.24q.24-.08.48.16h.08q.08.08-.08.24l-.96.88q-.4.32-.72.4l-1.04.72q-.08.08-.16 0l-.24-.32-.16-.32-.2-.28-.24-.32-.2-.24-.16-.2-.32-.24q-.16 0-.32-.08l-1.04-.8q-.24 0-.56-.24-1.2-1.04-1.6-1.28l-.48-.32-.96-.16q-.48-.08-1.28-.48l-.64-.32q-.64-.32-.88-.32l-.32-.16q-.32-.08-.48-.16l-.16-.16q-.16 0-.32.08l-1.6.8-2 .88q-.8.64-1.52 1.04l-.88.4-1.36.96q-.16.16-.32 0l-.16.16q-.24.08-.32.08l-.32.16v.16h-.16l-.16.24q-.16.32-.32.36t-.2.12-.08.12l-.16.16-.24.16-.36-.04-.48.08-.32.08q-.4.08-.64-.12t-.4-.6q-.16-.24.16-.4l.08-.08q.08-.08.24-.08h.48L1.6 26l.32-.08q0-.16.08-.24.08-.08.24-.08v-.08q-.08-.16-.08-.32-.08-.16-.04-.24t.08-.08h.04l.08.24q.08.4.24.24l.08-.16q.08-.16.24-.16l.16.16.16-.16-.08-.08q0-.08.08-.08l.32-.32q.4-.48.96-.88 1.12-.88 2.4-1.36.4-.4.88-.4.32-.56.96-1.2.56-.4.8-.56.16-.32.4-.32H10l.16-.16q.16-.08.24-.16v-.4q0-.4.08-.64t.4-.24l.32-.32q-.16-.32-.16-.72h-.08q-.16-.24-.16-.48-.24-.4-.32-.64h-.24q-.08.24-.4.32l-.08.16q-.32.56-.56.84t-.88.68q-.4.4-.56.88-.08.24 0 .48l-.08.16h.08q0 .16.08.16h.08q.16.08.16.2t-.24.08-.36-.16-.2-.12l-.24.24q-.16.24-.32.2t-.08-.12l.08-.08q.08-.16 0-.16l-.64.16q-.08.08-.2 0t.04-.16l.4-.16q0-.08-.08-.08-.32.16-.64.08l-.4-.08-.08-.08q0-.08.08-.08.32.08.8-.08l.56-.24.64-.72.08-.16q.32-.64.68-1.16t.76-.84l.08-.32q.16-.32.32-.56t.4-.64l.24-.32q.32-.48.72-.48l.24-.24q.08-.08.08-.24l.16-.16-.08-.08q-.48-.4-.48-.72-.08-.56.36-.96t.88-.36.68.28l.16.16q.08 0 .08.08l.32.16v.24q.16.16.16.24.16-.24.48-.56l.4-1.28q0-.32.16-.64l.16-.24v-.16l.24-.96h.16l.24-.96q.08-.24 0-.56l-.32-.8z"></path></svg></li>
                    <li className=".li-nav"> <svg height="24px" width="24px" fill="#111" viewBox="0 0 39 33"><path d="M10.94 25.626l-4.236-5.501L.201 22.28l3.734-5.756L.11 10.777l6.59 2.031 4.026-5.474.14 6.785 6.64 2.175-6.594 2.446.028 6.886zm.824 7.239l13.952-16.393L11.806.107h11.697l14.871 16.389-14.8 16.369h-11.81z"></path></svg></li>
                </ul>
                <ul className="right">
                    <li className="list .li-nav"><a href="https://github.com/gomez-julian/dsos-payment-frontend">Github</a></li>
                    <span className="list .li-nav">|</span>
                    <li className="list .li-nav"><a href="https://documenter.getpostman.com/view/17727354/UVsHSms5">Documentación</a></li>
                    <span className="list .li-nav">|</span>
                    <li className="list .li-nav"><p>{user}</p></li>
    
                    { active  ? (
                <li className="list .li-nav"><button className="btn" onClick={logout}>Cerrar sesión</button></li>
          ) : (
            <li className="list .li-nav"><button className="btn" onClick={() => setShow(true)}>Iniciar sesión</button></li>
          )}
                </ul>
    </nav>
    
    <div className="bottom left">
        <div className="icon">
              <svg className="pre-logo-svg" width="60px" height="60px" viewBox="0 0 64 34" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_2234_3616)"><path d="M37.1712 18.6259C37.8461 17.9897 38.4343 17.2673 38.9203 16.4773C39.4601 15.6057 39.9084 14.6807 40.2582 13.717C40.6096 12.7452 40.871 11.7433 41.039 10.7237C41.2072 9.7347 41.2943 8.73361 41.2993 7.73043C41.3098 6.68496 41.1691 5.64346 40.8816 4.63825C40.6244 3.74361 40.1893 2.91009 39.6023 2.18768C39.0141 1.48757 38.2703 0.934898 37.4302 0.573914C36.4769 0.174602 35.4507 -0.0208935 34.4174 -1.32568e-05C33.3902 -0.0101508 32.3717 0.189116 31.4241 0.585627C30.5325 0.968575 29.7153 1.50559 29.01 2.17206C28.2933 2.85524 27.674 3.63386 27.1698 4.48599C26.6464 5.35965 26.2159 6.28566 25.8853 7.24891C25.6494 7.93523 25.4543 8.63487 25.3009 9.34419C24.6833 8.43885 23.8142 7.73402 22.8009 7.31658C22.103 7.02891 21.3551 6.88207 20.6002 6.88451C20.141 6.88083 19.6821 6.91041 19.2272 6.973C18.8547 7.02381 18.4887 7.11412 18.1353 7.2424C17.8892 7.33351 17.6511 7.44495 17.4234 7.57556L18.311 4.70072H26.5984L27.46 0.676726H15.2136L11.5826 12.2672H15.8773L15.9945 12.0954C16.2907 11.6293 16.6987 11.2445 17.1814 10.9762C17.6773 10.7348 18.2242 10.6165 18.7756 10.6313C19.7191 10.6313 20.4492 10.8708 20.9451 11.3419C21.4409 11.813 21.683 12.547 21.683 13.54C21.6885 14.049 21.5948 14.5543 21.4071 15.0275C21.2346 15.46 20.98 15.8551 20.6575 16.191C20.3415 16.5149 19.9647 16.7731 19.5486 16.951C19.1205 17.1336 18.6593 17.2262 18.1939 17.223C17.3388 17.223 16.6322 17.02 16.0817 16.6191C15.5611 16.2404 15.3008 15.647 15.2852 14.8076V14.4171H10.7302L10.7445 14.8219C10.8226 17.02 11.515 18.6559 12.8034 19.6866C14.0697 20.6991 15.7966 21.2132 17.9258 21.2132C19.0707 21.2232 20.2085 21.032 21.2873 20.6483C22.2846 20.2942 23.201 19.7442 23.9826 19.0307C24.616 18.4413 25.1391 17.7437 25.5274 16.9705C25.7347 17.5265 26.011 18.0543 26.3499 18.5413C27.0927 19.5833 28.1726 20.3368 29.4069 20.6744L17.7306 23.76C13.8497 24.7686 10.7315 24.6346 8.95768 23.3553C4.4027 20.0133 7.8814 13.3265 9.11515 11.3302C6.89493 13.7768 4.6734 16.2209 2.94641 18.8914C0.218634 23.0703 -0.948741 27.6474 0.891469 30.5834C4.18927 35.8776 12.1084 33.4322 17.1592 31.3018L64 11.5384L37.1712 18.6259ZM33.4218 16.4448C33.0354 16.7136 32.5865 16.8788 32.1179 16.9243C31.6494 16.9699 31.177 16.8944 30.7461 16.705C30.4684 16.5659 30.2313 16.3574 30.0576 16.0999C29.8739 15.8134 29.7479 15.4937 29.6867 15.1589C29.6069 14.7504 29.5677 14.335 29.5696 13.9187C29.5696 13.4684 29.6008 12.9023 29.6646 12.2373C29.7284 11.5722 29.8325 10.8538 29.9769 10.1133C30.1267 9.35529 30.3218 8.60693 30.5613 7.87229C30.7819 7.17935 31.081 6.5139 31.4527 5.88892C31.7645 5.35914 32.1733 4.89289 32.6579 4.51462C33.0827 4.18916 33.6051 4.01714 34.1402 4.02659C34.5236 4.01532 34.9041 4.09563 35.2503 4.26084C35.5472 4.40865 35.8046 4.62501 36.0012 4.89203C36.2104 5.18091 36.3596 5.50884 36.4398 5.85638C36.536 6.27199 36.5836 6.69737 36.5817 7.12397C36.5817 7.55084 36.5504 8.10264 36.4866 8.76376C36.4155 9.471 36.3065 10.1739 36.16 10.8695C36.0033 11.6237 35.7995 12.3675 35.5496 13.0962C35.3179 13.7851 35.0125 14.4471 34.6386 15.0704C34.3257 15.6029 33.9124 16.0696 33.4218 16.4448V16.4448Z" fill="#111111"></path></g><defs><clipPath id="clip0_2234_3616"><rect width="64" height="33.7654" fill="white"></rect></clipPath></defs></svg>
               
        </div>

        <div className="nav">
            <ul>
                <li className="navigation .li-nav mx-3"> <Link to="/">Nuevos lanzamientos</Link></li>
                <li className="navigation .li-nav mx-3"><Link to="/cart">Carrito</Link>({cart.length})</li>
                <li className="navigation .li-nav mx-3"><Link to="/pay">Pagos</Link> </li>
                <li className="navigation .li-nav mx-3"><Link to="/crud">Crud</Link> </li>
            </ul>
        </div>
        <div className="right-side">
        <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="search"/>
        </div>
    </div>
</header>
  );
};
