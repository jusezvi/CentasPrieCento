import AdmNav from "./AdmComponents/AdmNav";
import FirstCard from "./AdmComponents/FirstCard";
import SecondCard from "./AdmComponents/SecondCard";
import ThirdCard from "./AdmComponents/ThirdCard";
import "./Administration.css"
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

function Administration() {
    return (
        <>
            <div className="adm-home">
                <nav>
                    <div className="adm-icon">
                        <MdOutlineAdminPanelSettings />
                    </div>
                    <h3 className="adm-text">Administracija</h3>
                    <AdmNav />
                </nav>
                <main>
                    <section className="administration-container">
                        <FirstCard />
                        <SecondCard />
                        <ThirdCard />
                    </section>

                    <section>

                        <div className='adm-tablte-container'>
                            <h3>Pavyzdys</h3>
                            <table className='tr '>
                                <thead>
                                    <tr>
                                        <th>pavadinimas</th>
                                        <th >pavadinimas </th>
                                        <th>Išlaidos/Pajamos</th>
                                        <th>Suma</th>
                                        <th>Pavadinimas</th>
                                        <th>Kategorija</th>
                                        <th>Data</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td >tekstas</td>
                                        <td >tekstas</td>
                                    </tr>
                                    <tr>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td >tekstas</td>
                                        <td >tekstas</td>
                                    </tr>
                                    <tr>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td>tekstas</td>
                                        <td >tekstas</td>
                                        <td >tekstas</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                        


                    </section>



                </main>

            </div>


            <footer></footer>





        </>

    );
}
export default Administration;