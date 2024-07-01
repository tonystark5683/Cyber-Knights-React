import { React, useState } from "react";
import { ServicesList } from "../helpers/ServiceList";
import ServiceItem from "../components/ServiceItem";
import "../styles/Service.css";
import axios from "axios";
const Service = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [result,setResult] = useState("");
  const [formData, setFormData] = useState({
    attack: 0.0,
    count: 0.0,
    dst_host_diff_srv_rate: 0.0,
    dst_host_same_src_port_rate: 0.0,
    dst_host_same_srv_rate: 0.0,
    dst_host_srv_count: 0.0,
    flag: 0.0,
    last_flag: 0.0,
    logged_in: 0.0,
    same_srv_rate: 0.0,
    serror_rate: 0.0,
    service_http: 0.0,
  });
  console.log(formData);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setResult("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/predict", formData)
      .then((response) => {
        console.log(response.data);
        setResult(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div className="services">
      {/* <h1 className="servicesTitle">Our Services</h1> */}
      <div className="servicesList" onClick={openPopup}>
        {ServicesList.map((servicesItem, key) => (
          <ServiceItem
            key={key}
            image={servicesItem.image}
            name={servicesItem.name}
          />
        ))}
      </div>
      {isPopupOpen && (
        <div className="popupBackground">
          <div className="popup">
            <span className="spann">
              <h2>Network Intrusion Detection System Form</h2>
            </span>
            <form onSubmit={handleSubmit} className="popupForm">
              <label htmlFor="attack">Attack:</label>
              <select id="attack" name="attack" onChange={handleChange}>
                <option value="0">Other</option>
                <option value="1">neptune</option>
                <option value="2">normal</option>
                <option value="3">satan</option>
              </select>
              <br />
              <br />

              <label htmlFor="count">
                Number of connections to the same destination host as the
                current connection in the past two seconds :
              </label>
              <input
                type="text"
                name="count"
                placeholder="count"
                required
                onChange={handleChange}
              />
              <br />
              <br />

              <label htmlFor="dst_host_diff_srv_rate">
                The percentage of connections that were to different services,
                among the connections aggregated in dst_host_count :
              </label>
              <input
                type="text"
                name="dst_host_diff_srv_rate"
                placeholder="dst_host_diff_srv_rate"
                required
                onChange={handleChange}
              />
              <br />
              <br />

              {/* Add the rest of the form fields here */}

              <label htmlFor="dst_host_same_src_port_rate">
                The percentage of connections that were to the same source port,
                among the connections aggregated in dst_host_srv_count :
              </label>
              <input
                type="text"
                name="dst_host_same_src_port_rate"
                placeholder="dst_host_same_src_port_rate"
                required
                onChange={handleChange}
              />
              <br />
              <br />

              <label htmlFor="dst_host_same_srv_rate">
                The percentage of connections that were to the same service,
                among the connections aggregated in dst_host_count :
              </label>
              <input
                type="text"
                name="dst_host_same_srv_rate"
                placeholder="dst_host_same_srv_rate"
                required
                onChange={handleChange}
              />
              <br />
              <br />

              <label htmlFor="dst_host_srv_count">
                Number of connections having the same port number :
              </label>
              <input
                type="text"
                name="dst_host_srv_count"
                placeholder="dst_host_srv_count"
                required
                onChange={handleChange}
              />
              <br />
              <br />

              <label htmlFor="flag">
                Status of the connection –Normal or Error :
              </label>
              <select id="flag" name="flag" onChange={handleChange}>
                <option value="0">Other</option>
                <option value="1">S0</option>
                <option value="2">SF</option>
              </select>
              <br />
              <br />

              <label htmlFor="last_flag">Last Flag :</label>
              <input
                type="text"
                name="last_flag"
                placeholder="last_flag"
                required
                onChange={handleChange}
              />
              <br />
              <br />

              <label htmlFor="logged_in">
                1 if successfully logged in; 0 otherwise :
              </label>
              <input
                type="text"
                name="logged_in"
                placeholder="logged_in"
                required
                onChange={handleChange}
              />
              <br />
              <br />

              <label htmlFor="same_srv_rate">
                The percentage of connections that were to the same service,
                among the connections aggregated in count :
              </label>
              <input
                type="text"
                name="same_srv_rate"
                placeholder="same_srv_rate"
                required
                onChange={handleChange}
              />
              <br />
              <br />

              <label htmlFor="serror_rate">
                The percentage of connections that have activated the flag (4)
                s0, s1, s2 or s3, among the connections aggregated in count :
              </label>
              <input
                type="text"
                name="serror_rate"
                placeholder="serror_rate"
                required
                onChange={handleChange}
              />
              <br />
              <br />

              <label htmlFor="service_http">
                Destination network service used http or not :
              </label>
              <select
                id="service_http"
                name="service_http"
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
              <br />
              <br />
              <span className="spann">Attack Type : {result}</span>

              <span className="spanButton">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-large"
                >
                  Predict
                </button>
                <button onClick={closePopup} className="btn btn-primary btn-block btn-large">
                  Close
                </button>
                
              </span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
