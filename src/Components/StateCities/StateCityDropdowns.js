import React, {useEffect, useState} from 'react';
import india from './States/india.png'
import ap from './States/andhrapradesh.png'
import ar from './States/arunachalpradesh.png'
import as from './States/assam.png'
import br from './States/bihar.png'
import ct from './States/chhattisgarh.png'
import ga from './States/goa.png'
import gj from './States/gujarat.png'
import hr from './States/haryana.png'
import hp from './States/himachalpradesh.png'
import jk from './States/jk.png'
import jh from './States/jharkhand.png'
import ka from './States/karnataka.png'
import kl from './States/kerala.png'
import mp from './States/madhyapradesh.png'
import mh from './States/maharashtra.png'
import mn from './States/manipur.png'
import ml from './States/meghalaya.png'
import mz from './States/mizoram.png'
import nl from './States/nagaland.png'
import od from './States/odisha.png'
import pb from './States/punjab.png'
import rj from './States/rajasthan.png'
import sk from './States/sikkim.png'
import tn from './States/tamilnadu.png'
import ts from './States/telangana.png'
import tr from './States/tripura.png'
import up from './States/uttarpradesh.png'
import uk from './States/uttarakhand.png'
import wb from './States/westbengal.png'
import Papa from 'papaparse';
import {csvString} from "../Information/data";
import "./StateCityDropdowns.css"


const states = [
    { code: 'AP', name: 'Andhra Pradesh' },
    { code: 'AR', name: 'Arunachal Pradesh' },
    { code: 'AS', name: 'Assam' },
    { code: 'BR', name: 'Bihar' },
    { code: 'CT', name: 'Chhattisgarh' },
    { code: 'GA', name: 'Goa' },
    { code: 'GJ', name: 'Gujarat' },
    { code: 'HR', name: 'Haryana' },
    { code: 'HP', name: 'Himachal Pradesh' },
    { code: 'JK', name: 'Jammu and Kashmir' },
    { code: 'JH', name: 'Jharkhand' },
    { code: 'KA', name: 'Karnataka' },
    { code: 'KL', name: 'Kerala' },
    { code: 'MP', name: 'Madhya Pradesh' },
    { code: 'MH', name: 'Maharashtra' },
    { code: 'MN', name: 'Manipur' },
    { code: 'ML', name: 'Meghalaya' },
    { code: 'MZ', name: 'Mizoram' },
    { code: 'NL', name: 'Nagaland' },
    { code: 'OD', name: 'Odisha' },
    { code: 'PB', name: 'Punjab' },
    { code: 'RJ', name: 'Rajasthan' },
    { code: 'SK', name: 'Sikkim' },
    { code: 'TN', name: 'Tamil Nadu' },
    { code: 'TS', name: 'Telangana' },
    { code: 'TR', name: 'Tripura' },
    { code: 'UP', name: 'Uttar Pradesh' },
    { code: 'UK', name: 'Uttarakhand' },
    { code: 'WB', name: 'West Bengal' }
];

const citiesByState = {
    AP: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
    AR: ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
    AS: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salamara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    BR: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    CT: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
    GA: ["North Goa", "South Goa"],
    GJ: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"]
    ,
    HR: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"]
    ,
    HP: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"]
    ,
    JK: ["Anantnag", "Bandipore", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Leh", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"]
    ,
    JH: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"]
    ,
    KA: ["Bagalkot", "Ballari (Bellary)", "Belagavi (Belgaum)", "Bengaluru (Bangalore) Rural", "Bengaluru (Bangalore) Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru (Chikmagalur)", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi (Gulbarga)", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru (Mysore)", "Raichur", "Ramanagara", "Shivamogga (Shimoga)", "Tumakuru (Tumkur)", "Udupi", "Uttara Kannada (Karwar)", "Vijayapura (Bijapur)", "Yadgir"]
    ,
    KL: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"]
    ,
    MP: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"]
    ,
    MH: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"]
    ,
    MN: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"]
    ,
    ML: ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"]
    ,
    MZ: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"]
    ,
    NL: ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"]
    ,
    OD: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar (Keonjhar)", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"]
    ,
    PB: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr (Shahid Bhagat Singh Nagar)", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar (Mohali)", "Sangrur", "Tarn Taran"]
    ,
    RJ: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"]
    ,
    SK: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"]
    ,
    TN: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi (Tuticorin)", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"]
    ,
    TS: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhoopalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"]
    ,
    TR: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"]
    ,
    UP: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi (Chatrapati Sahuji Mahraj Nagar)", "Amroha (J.P. Nagar)", "Auraiya", "Ayodhya", "Azamgarh", "Badaun", "Baghpat", "Bahraich", "Balarampur", "Ballia", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur (Panchsheel Nagar)", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj (Kanshiram Nagar)", "Kaushambi", "Kushinagar (Padrauna)", "Lakhimpur - Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj (Allahabad)", "Raebareli", "Rampur", "Saharanpur", "Sambhal (Bhim Nagar)", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"]
    ,
    UK: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"]
    ,
    WB: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur (South Dinajpur)", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman (West Bardhaman)", "Paschim Medinipur (West Medinipur)", "Purba Bardhaman (East Bardhaman)", "Purba Medinipur (East Medinipur)", "Purulia", "South 24 Parganas", "Uttar Dinajpur (North Dinajpur)"]
    ,
};

const parseCSV = (csvString) => {
    return new Promise((resolve, reject) => {
        Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (err) => {
                reject(err);
            },
        });
    });
};

const crimeNames = [
    "Murder",
    "Rape",
    "KIDNAPPING & ABDUCTION",
    "DACOITY",
    "ROBBERY",
    "BURGLARY",
    "THEFT",
    "RIOTS",
    "CHEATING",
    "COUNTERFIETING",
    "ARSON",
    "HURT/GREVIOUS HURT",
    "DOWRY DEATHS",
    "ASSAULT ON WOMEN WITH INTENT TO OUTRAGE HER MODESTY",
    "INSULT TO MODESTY OF WOMEN",
    "CRUELTY BY HUSBAND OR HIS RELATIVES",
    "IMPORTATION OF GIRLS FROM FOREIGN COUNTRIES",
    "CAUSING DEATH BY NEGLIGENCE",
];



function StateCityDropdowns() {
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedStateImage, setSelectedStateImage] = useState(null);

    const [csvData, setCsvData] = useState([]);

    useEffect(() => {
        const parseData = async () => {
            try {
                const data = await parseCSV(csvString);
                setCsvData(data);
            } catch (err) {
                console.error('Error parsing CSV string:', err);
            }
        };

        parseData();
    }, []);

    const displaySelectedStateData = () => {
        if (!selectedState) {
            return null;
        }

        const stateData = csvData.filter((row) => row.STATE === selectedState);
        const headers = stateData.length > 0 ? Object.keys(stateData[0]).filter((header) => header !== "STATE") : [];

        return (
            <div>
                <h2>District wise Crimes of {selectedState} :</h2>
                <table>
                    <thead>
                    <tr>
                        {/*{stateData.length > 0 &&*/}
                        {/*    Object.keys(stateData[0]).map((header, index) => (*/}
                        {/*        <th key={index}>{header}</th>*/}
                        {/*    ))}*/}
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {/*{stateData.map((row, index) => (*/}
                    {/*    <tr key={index}>*/}
                    {/*        {Object.values(row).map((value, index) => (*/}
                    {/*            <td key={index}>{value}</td>*/}
                    {/*        ))}*/}
                    {/*    </tr>*/}
                    {/*))}*/}
                    {stateData.map((row, index) => (
                        <tr key={index}>
                            {headers.map((columnName, columnIndex) => (
                                <td key={columnIndex}>{row[columnName]}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const getCrimeTotals = () => {
        if (!selectedState || !csvData.length) {
            return [];
        }

        const stateData = csvData.filter((row) => row.STATE === selectedState);
        const crimeTotals = crimeNames.map((crimeName) => {
            const crimeTotal = stateData.reduce((sum, row) => sum + parseInt(row[crimeName]), 0);
            return { crimeName, crimeTotal };
        });

        return crimeTotals;
    };
    const getTopCrimesWithPercentage = () => {
        const crimeTotals = getCrimeTotals();
        if (crimeTotals.length === 0) return [];

        const total = crimeTotals.reduce((acc, curr) => acc + curr.crimeTotal, 0);

        return crimeTotals
            .sort((a, b) => b.crimeTotal - a.crimeTotal)
            .slice(0, 3)
            .map((crime) => ({
                name: crime.crimeName,
                total: crime.crimeTotal,
                percentage: ((crime.crimeTotal / total) * 100).toFixed(2),
            }));
    };

    const getAverageCrimeValue = () => {
        if (!selectedState || !csvData.length) {
            return 0;
        }

        const stateData = csvData.filter((row) => row.STATE === selectedState);
        const totalCrimes = crimeNames.reduce(
            (sum, crimeName) =>
                sum +
                stateData.reduce(
                    (crimeSum, row) => crimeSum + parseInt(row[crimeName]),
                    0
                ),
            0
        );

        const averageCrimeValue = totalCrimes / (stateData.length * crimeNames.length);
        return averageCrimeValue;
    };

    const getBackgroundColor = () => {
        const crimeTotals = getCrimeTotals();
        const totalCrimes = crimeTotals.reduce((sum, crime) => sum + crime.crimeTotal, 0);
        const selectedStateTotal = crimeTotals.find((crime) => crime.crimeName === "Total").crimeTotal;
        const selectedStatePercentage = Math.round((selectedStateTotal / totalCrimes) * 100);

        // Shade of red based on the selected state's percentage of total crimes
        if (selectedStatePercentage >= 10) {
            return "#c70000";
        } else if (selectedStatePercentage >= 5) {
            return "#f03c3c";
        } else if (selectedStatePercentage >= 3) {
            return "#ff6666";
        } else if (selectedStatePercentage >= 1) {
            return "#ffb3b3";
        } else {
            return "#ffe6e6";
        }
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedCity('');
        const selectedStateObj = states.find(
            (state) => state.name === event.target.value
        );
        setSelectedStateImage(india);

        // Set the image corresponding to the selected state
       if(selectedStateObj){
           switch (selectedStateObj.code) {
               case 'AP':
                   setSelectedStateImage(ap);
                   break;
               case 'AR':
                   setSelectedStateImage(ar);
                   break;
               case 'AS':
                   setSelectedStateImage(as);
                   break;
               case 'BR':
                   setSelectedStateImage(br);
                   break;
               case 'CT':
                   setSelectedStateImage(ct);
                   break;
               case 'GA':
                   setSelectedStateImage(ga);
                   break;
               case 'GJ':
                   setSelectedStateImage(gj);
                   break;
               case 'HR':
                   setSelectedStateImage(hr);
                   break;
               case 'HP':
                   setSelectedStateImage(hp);
                   break;
               case 'JK':
                   setSelectedStateImage(jk);
                   break;
               case 'JH':
                   setSelectedStateImage(jh);
                   break;
               case 'KA':
                   setSelectedStateImage(ka);
                   break;
               case 'KL':
                   setSelectedStateImage(kl);
                   break;
               case 'MP':
                   setSelectedStateImage(mp);
                   break;
               case 'MH':
                   setSelectedStateImage(mh);
                   break;
               case 'MN':
                   setSelectedStateImage(mn);
                   break;
               case 'ML':
                   setSelectedStateImage(ml);
                   break;
               case 'MZ':
                   setSelectedStateImage(mz);
                   break;
               case 'NL':
                   setSelectedStateImage(nl);
                   break;
               case 'OD':
                   setSelectedStateImage(od);
                   break;
               case 'PB':
                   setSelectedStateImage(pb);
                   break;
               case 'RJ':
                   setSelectedStateImage(rj);
                   break;
               case 'SK':
                   setSelectedStateImage(sk);
                   break;
               case 'TN':
                   setSelectedStateImage(tn);
                   break;
               case 'TS':
                   setSelectedStateImage(ts);
                   break;
               case 'TR':
                   setSelectedStateImage(tr);
                   break;
               case 'UP':
                   setSelectedStateImage(up);
                   break;
               case 'UK':
                   setSelectedStateImage(uk);
                   break;
               case 'WB':
                   setSelectedStateImage(wb);
                   break;
               default:
                   setSelectedStateImage(india);
           }
       }

    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div>
            <select value={selectedState} onChange={handleStateChange}>
                <option value="">Select a state</option>
                {states.map((state) => (
                    <option key={state.code} value={state.name}>
                        {state.name}
                    </option>
                ))}
            </select>
            <br />
            {selectedState && (
                <div className="Details">
                    <p>
                        {selectedStateImage ? (
                            <img
                                src={selectedStateImage}
                                alt={selectedState}
                                style={{
                                    height: "50",
                                    width: "50",
                                    display: "inline-block",
                                }}
                            />
                        ) : (
                            <img
                                src={india}
                                alt="Default Image"
                                style={{
                                    height: "100",
                                    width: "150",

                                }}
                            />
                        )}
                    </p>
                    <div>
                        <h2>Crimes of {selectedState}</h2>
                        {getCrimeTotals().map(({ crimeName, crimeTotal }, index) => (
                            <p key={index}>
                                <span className="crime-name">{crimeName}:</span>{" "}
                                {crimeTotal}
                            </p>
                        ))}
                    </div>
                    <h3>Most Committed Crimes</h3>
                    {getTopCrimesWithPercentage().map((crime, index) => (
                        <p key={index}>
                            <strong>{crime.name}:</strong> {crime.total} (
                            {crime.percentage}%)
                        </p>
                    ))}
                </div>
            )}

            {displaySelectedStateData()}
        </div>

    );
}

export default StateCityDropdowns;



{/*<select value={selectedCity} onChange={handleCityChange}>*/}
{/*    <option value="">Select a city</option>*/}
{/*    {citiesByState[selectedState] && citiesByState[selectedState].map(city => (*/}
{/*        <option key={city} value={city}>{city}</option>*/}
{/*    ))}*/}
{/*</select>*/}
{/*<p>You selected: {selectedCity ? `${selectedCity}, ${selectedState}` : ''}</p>*/}