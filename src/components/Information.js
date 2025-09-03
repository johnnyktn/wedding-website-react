import React from 'react';
import '../styles/Common.css';
import '../styles/Information.css';
import '../styles/Register.css';

function Information() {
    return (
        <div className="information-container shared-container">
            <h1>Information</h1>

            <section className="information-section">
                <h2>Välkommen</h2>
                <p>
                    Mitt i vintern, på kärlekens egen dag, vill vi säga ja till livet tillsammans. Mest av allt vill vi göra det tillsammans med våra nära och kära. Tillsammans hoppas vi på att skapa en oförglömlig dag fylld av värme, skratt och kärlek med er.
                </p>
            </section>

            <section className="information-section">
                <h2>Detaljer</h2>
                <ul>
                    <li>
                        <b>Datum & Tid:</b>{' '}
                        <a
                            href="/wedding-invitation.ics"
                            download="wedding-invitation.ics"
                        >
                            14 februari 2026 15:00 - 01:00 (Lägg till i kalender)
                        </a>
                    </li>
                    <li>
                        <b>Plats:</b>{' '}
                        <a
                            href="https://maps.app.goo.gl/afm7YdrUchQX8RTy6"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Gunneboslott, Göteborg
                        </a>
                    </li>
                    <li><b>OSA senast:</b> 15:e Oktober 2025</li>
                    <li><i>
                        Barn är varmt välkomna!</i></li>
                </ul>
            </section>

            <section className="information-section">
                <h2>Klädsel</h2>
                <p>
                    <b>Festligt & Glammigt</b> - som en bal på slottet!
                    Tänk glitter, siden och uppklätt.
                    Klänning i valfri färg och längd, byxor eller kjol går lika bra. Kostym eller smoking för herrar. 
                </p>
                <p>
                    <i>
                        Obs! Det kan bli lite kyligt under vigsel och middag så ta gärna med en sjal, tröja eller jacka.
                    </i>
                </p>
            </section>

            <section className="information-section">
                <h2>Underhållning</h2>
                <p>
                    Kvällen kommer styras upp och ledas av våra två stjärnor <b>Mia Hellberg</b> och <b>Hannes Thorén Sadek</b>.
                </p>
                <p>
                    Vid planering av diverse spex och/eller tal kan ni kontakta:
                </p>
                <ul>
                    <li><b>E-post:</b> <a href="mailto:miahellberg1@gmail.com">miahellberg1@gmail.com</a></li>
                    <li><b>Telefon:</b> <a href="tel:0705256204">0705256204</a></li>
                </ul>
            </section>

            <section className="information-section">
                <h2>Gåvor</h2>
                <p>
                    Er närvaro är det viktigaste för oss så gåvor är inget som vi förväntar oss. Om ni mot förmodan vill ge en gåva ändå så skulle vi bli glada om ni bidrog till vår bröllopsresa där vi ska äventyra i Sydamerika. Vi har skapat en insamling som administreras av vår kära Toast Master där ni kan bidra med valfritt belopp. Vi kommer bara se totala summan. Inget annat.
                    <ul>
                        <li><b>Gåvan kan ges via Swish:</b></li>
                        <li> <b>Mottagare: Hannes Thorén Sadek</b></li>
                        <li> <b>Meddelande: <i>WJWedding2026</i></b></li>
                        <li> <b>Nummer: <a href="tel:0734434312">0734434312</a></b></li>
                    </ul>
                </p>
            </section>
            <section className="information-section">
                <h2>Boende & Transport</h2>
                <ul>
                    <li>
                        Parkering finns vid Gunneboslott.
                    </li>
                    <li> Närmaste bushållplats är: {' '}
                        <a
                            href="https://maps.app.goo.gl/q63APtfHoAaQuHbEA"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                             Gunnebo Park
                        </a>
                    </li>


                        <li>Hotell i närheten: <a href="https://www.scandichotels.com/sv/hotell/scandic-molndal">Scandic Hotel Mölndal</a> & <a href="https://www.strawberry.se/hotell/sverige/molndal/quality-hotel-the-weaver/?utm_campaign=bb-sok-se-brand-hotel&gad_source=1&gad_campaignid=16830824141&gclid=Cj0KCQjws4fEBhD-ARIsACC3d2_f0AqHDOmqp8xnVSm_xhBijdI3kM1xeR5WpYhB_sRvpexOtRT3z-QaAlD7EALw_wcB">Quality Hotel The Weaver</a></li>
                </ul>
            </section>
        </div>
    );
}

export default Information;