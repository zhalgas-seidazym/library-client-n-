import React, {Component} from 'react';
import axios from "../api/axios";

class MainPage extends Component {
    render() {
        return (
            <main>
                <div id="section-1">
                    <div className="container">
                        <div className="booksCollection">
                            <div className="books">
                                <img src="images/main/section-1/harryPotterCover.png" alt=""/>
                                <img src="images/main/section-1/AbayJolyCover.png" alt=""/>
                                <img src="images/main/section-1/BabelCover.png" alt=""/>
                                <img src="images/main/section-1/worldDeathAnimalsCover.png" alt=""/>
                                <img src="images/main/section-1/you-are-your-own-fairy-tale-9781524880859_hr 1.png"
                                     alt=""/>
                                <img src="images/main/section-1/Sin-Eater-by-Megan-Campisi 1.png" alt=""/>
                                <img src="images/main/section-1/1003w-53S3IzrNxvY 1.png" alt=""/>
                            </div>
                            <div className="table">
                                <img src="images/main/section-1/table for books.png" alt=""/>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '50px'
                            }}>
                                <img src="images/main/section-1/TO THE READING.png" alt=""/>
                                <img src="images/main/section-1/logo-removebg-preview.png" alt="" width="150px"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div id="section-2">
                    <div className="container">
                        <div className="sub-sections">
                            <div className="section-texts">
                                <h1>READ AT ANY TIME ANY BOOKS</h1>
                                <p>UNLOCK THE DOORS TO IMAGINATION, EMBARK ON JOURNEYS UNTOLD, FOR WITHIN THESE WORDS,
                                    WORLDS UNFOLD. DAY OR NIGHT, LET YOUR MIND ROAM FREE, IN THE REALMS OF STORIES,
                                    ENDLESS POSSIBILITIES DECREE.</p>
                            </div>
                            <img src="images/main/other-sections/read any books.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div id="section-3">
                    <div className="container">
                        <div className="sub-sections">
                            <img src="images/main/other-sections/4522407326f51c40c24701f99d5ed077 1.png" alt=""/>
                            <div className="section-texts">
                                <h1>READY FOR FUTURE</h1>
                                <p>EMBRACE THE FUTURE: YOUR ESSENTIAL GUIDE TO UNLOCKING TOMORROW'S STORIES TODAY OFFERS
                                    INSIGHTS ON EMERGING TECHNOLOGIES, SOCIETAL SHIFTS, AND CULTURAL TRENDS TO HELP
                                    READERS NAVIGATE AND THRIVE IN TOMORROW'S WORLD.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="container">
                    <div className="stepsOfStudying" id="questions">
                        <div className="maraphone5">FREQUENTLY ASKED QUESTIONS</div>
                        <div className="questions">
                            <br/>
                            <br/>
                            <hr/>
                            <br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div className="questiontext">WHAT CAN I READ IN THIS SERVICE?</div>
                                <div style={{fontSize: '35px', fontWeight: 500, cursor: 'pointer'}}>+</div>
                            </div>

                            <br/>
                            <hr/>
                            <br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div className="questiontext">HOW MUCH DOES THE BOOK COST?</div>
                                <div style={{fontSize: '35px', fontWeight: 500, cursor: 'pointer'}}>+</div>
                            </div>
                            <br/>
                            <hr/>
                            <br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div className="questiontext">CAN I READ BOOKS WITH A FRIEND?</div>
                                <div style={{fontSize: '35px', fontWeight: 500, cursor: 'pointer'}}>+</div>
                            </div>
                            <br/>
                            <hr/>
                            <br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div className="questiontext">WHAT SHOULD I DO IF I FORGOT MY PASSWORD?</div>
                                <div style={{fontSize: '35px', fontWeight: 500, cursor: 'pointer'}}>+</div>
                            </div>
                            <br/>
                            <hr/>
                            <br/>
                        </div>
                        <div style={{
                            marginTop: '50px',
                            lineHeight: '34px',
                            color: '#343d38',
                            fontSize: '36px',
                            fontFamily: "'TildaSans',Arial,sans-serif",
                            fontWeight: 700,
                            letterSpacing: '-0.5px',
                            textAlign: 'center'
                        }}>
                            DIDN'T FIND THE ANSWER TO YOUR QUESTION?
                        </div>
                        <div style={{
                            marginTop: '20px',
                            lineHeight: '24px',
                            color: '#878888',
                            fontSize: '20px',
                            fontWeight: 500,
                            letterSpacing: '-0.5px',
                            textAlign: 'center'
                        }}>
                            WRITE IN A MESSENGER THAT IS CONVENIENT FOR YOU, WE WILL RESPOND VERY QUICKLY.
                        </div>

                        <div className="buttonsdiv">
                            <div className="lastbutton"
                                 style={{color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(37, 211, 102)'}}>Задать свой
                                вопрос в
                                What'sApp
                            </div>
                            <div className="lastbutton"
                                 style={{color: 'white', backgroundColor: 'rgb(0, 136, 204)'}}>Задать свой вопрос в
                                Telegram
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default MainPage;