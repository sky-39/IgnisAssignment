import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

const addEvent = async (data) => {
  try {
    console.log(data);
    const response = await axios.post("http://localhost:8000/api/v1/events", data);
    console.log("Event hosted:", response.data);
  } catch (err) {
    console.error("Error in hosting event:", err);
  }
};

const CreateEventPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo.id);

  const [event, setEvent] = useState({
    user: userInfo.id,
    event_name: "",
    data: "",
    time: "",
    location: "",
    image: "",
  });

  const submitEvent = async (ev) => {
    console.log(ev);
    console.log(event);
    addEvent(event);
    ev.preventDefault();
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;

    setEvent((prevEvent) => {
      return {
        ...prevEvent,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <form>
        <div>
          {/* <img src={avatar} className="h-14 w-14 rounded-full " /> */}

          <input
            type="text"
            name="event_name"
            placeholder="Event Name"
            onChange={handleChange}
            value={event.event_name}
          />
          <input
            type="text"
            name="data"
            placeholder="Enter Event Data"
            onChange={handleChange}
            value={event.data}
          />
          <input
            type="datetime-local"
            name="time"
            placeholder="What's happening"
            onChange={handleChange}
            value={event.time}
          />
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            onChange={handleChange}
            value={event.location}
          />
        </div>

        <div>
          <div>
            <input
              type="file"
              name="image"
              id="file-input"
              onChange={handleChange}
              value={event.image}
            />
          </div>
        </div>

        {/* <div className="flex justify-center items-center">
          {formik.values.image && <SeeImage file={formik.values.image} />}
        </div> */}

        <div>
          <button type="submit" onClick={submitEvent}>
            Host Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;

// const SeeImage = ({ file }) => {
//   const [preview, setPreview] = useState({});

//   if (file) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setPreview(reader.result);
//     };

//     const handleClose = () => {
//       setPreview("");
//     };

//     return (
//       <div className="flex justify-between rounded-lg">
//         <div className="left-0 top-0">
//           <button
//             className="text-slate-400 hover:text-slate-200 transition-colors"
//             onClick={handleClose}
//           >
//             <AiFillCloseCircle size={30} />
//           </button>
//         </div>

//         <img src={preview} width={350} height={350} />
//       </div>
//     );
//   }
// };
