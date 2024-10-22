// SearchBar.js

import React , {useState} from 'react';
import "./Searchbar.css";
import { useNavigate } from 'react-router-dom';

import api from '../../api';

const SearchBar = () => {

//   const [input, setInput] = useState('');
//   const [id, setId] = useState('');

//   //const [list, setList] = useState([]);
//   const navigate = useNavigate();

//   const handleChange = texter =>{

//     setInput(texter.target.value);
//   }

//   const handleSubmit = async(texter) =>
//   {
//       texter.preventDefault();

//       //var task = texter.target.value;
//       console.log(input);
//       if(!input || /^\s*$/.test(input))
//       {
//         return;
//       }
//       let studentObj = undefined;
//       try{
//         studentObj = await api.get(`/api/student/first_name/${input}`)
//       }catch{
//         return;
//       }

//       if(studentObj === undefined)
//       {
//         return;
//       }
//       setId(studentObj.data.id)


//       let urlStr = "/student/" + Number(studentObj.data.id)
//       navigate(urlStr)

//       setInput('');
//   } 


  

//   return (
//     <>
//     <div className="overlayContainer">     
//         <form className="SearchFirstName" onSubmit={handleSubmit}>
//             <input type="text" 
//             className="searchBarInput"
//             placeholder="Search by First Name"
//             value={input}
//             name='text'
//             onChange={handleChange}
//             />
//         </form>
//     </div>
//     </>
//   );
}

export default SearchBar;