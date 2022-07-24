import React, {useState, useLayoutEffect} from "react";
import logo from "../assets/logo.png";
import "../App.css";
import axios from "axios";

function today() {
    const date = new Date()
    const localeDateString = date.toLocaleDateString()
    const dateString = localeDateString.replaceAll("/", "-")
    const day = dateString.split("-")[0]
    const month = dateString.split("-")[1]
    const year = dateString.split("-")[2]
    const today = year + "-" + month + "-" + day
    return today;
}

const MIN_TEXTAREA_HEIGHT = 32;
const MAX_TEXTAREA_HEIGHT = 200;

function Page2(props) {

    const [date, setDate] = useState(today());
    const onDateChange = (e) => {
        setDate(e.target.value);
    }

    const [place, setPlace] = useState('');
    const onPlaceChange = (e) => {
        setPlace(e.target.value);
    }

    const [client, setClient] = useState('');
    const onClientChange = (e) => {
        setClient(e.target.value);
    }


    const textareaRef = React.useRef(null);
    const [textAreaValue, setTextAreaValue] = useState("");
    const onTextAreaChange = (event) => setTextAreaValue(event.target.value);

    useLayoutEffect(() => {
        // Reset height - important to shrink on delete
        textareaRef.current.style.height = "inherit";
        // Set height
        textareaRef.current.style.height = `${Math.max(
            textareaRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
    }, [textAreaValue]);

    const handleSubmit = e => {
        e.preventDefault();

        if (!date) {
            alert("Inserisci la data");
        } else if (!place) {
            alert("Inserisci il luogo");
        } else if (!client) {
            alert("Inserisci il cliente");
        }  else {
            const formData = new FormData();
            formData.append("date", date);
            formData.append("place", place);
            formData.append("client", client);
            textAreaValue && formData.append("textAreaValue", textAreaValue);
            axios
                .post('Insert here URL of your server where you want to send the data of the form', formData)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => alert("Make sure the url of the server where you want to send the data is correct :)"));
        }
    };

    return (
        <div className="Page2">
            <img src={logo} className="logo" alt="Business view - Reports"/>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="date">Data</label>
                    <input type="date" id="date" name="date" defaultValue={date} onChange={onDateChange}/>
                </div>
                <div className="input-group">
                    <label htmlFor="place">Luogo</label>
                    <input type="text" name="place" placeholder="Licata" value={place} onChange={onPlaceChange}/>
                </div>
                <div className="input-group">
                    <label htmlFor="client">Cliente</label>
                    <input type="text" name="client" placeholder="Eurospin" value={client} onChange={onClientChange}/>
                </div>
                <div className="input-group">
                    <textarea
                        onChange={onTextAreaChange}
                        ref={textareaRef}
                        style={{
                            minHeight: MIN_TEXTAREA_HEIGHT,
                            maxHeight: MAX_TEXTAREA_HEIGHT,
                            resize: "none"
                        }}
                        placeholder={"Inserisci qui il testo"}
                        value={textAreaValue}
                    />
                </div>
                <button className="primary">Submit</button>
            </form>
        </div>
    );
}

export default Page2;
