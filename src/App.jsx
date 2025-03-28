import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {

  const [length,setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [password,setPassword]  = useState("");
  // useRef hook
  const passWordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*+=[]{}~`";

    for(let i=1; i<=length; i++){

      let char = Math.floor(Math.random() * str.length + 1) ;
      pass += str.charAt(char);

    }

    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passWordRef.current?.select();
    passWordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password);
    console.log(passWordRef.current);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-10 my-8 text-orange-500 bg-gray-700 h-[200px]" >
      <h1 className="text-white text-center font-bold text-4xl mb-6">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-7">
      <input
      type="text"
      value={password}
      readOnly="true"
      placeholder="password"
      className="outline-none w-full py-1 px-3"
      ref = {passWordRef}
      />
      <button
        onClick={copyPasswordToClipboard}
       className="outline-none
        bg-blue-700
        hover:bg-blue-400
         text-white px-3 py-0.5  shrink-0" >copy</button>
      </div>
        <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>setLength(e.target.value)}
          />
          <label>Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setNumberAllowed(!numberAllowed);
            }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={()=>{
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
