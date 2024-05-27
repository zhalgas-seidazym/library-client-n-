import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <hr />
                <br />
                <div className="footertext">
                    <div className="footertexts">
                        <div className="excellast">Library App</div>
                        <div className="littlegray">АО «Dimash Group»</div>
                    </div>
                    <div>
                        <div className="graywords">TOO DIMASH</div>
                        <div className="graywords">Dinmukhammed Arystambek</div>
                        <div className="littlegray">Распространение материала только с указанием авторства</div>
                    </div>
                    <div>
                        <div className="graywords">Политика конфиденциальности</div>
                        <div className="graywords">Договор оферты</div>
                        <div className="littlegray">Разработка сайта</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
