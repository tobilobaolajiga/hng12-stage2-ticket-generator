import { useState, useEffect } from 'react';
import cloud from '../assets/cloud.svg';
import envelope from '../assets/envelope.svg';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function Form({ showTicket, goBack }) {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [photo, setPhoto] = useState(localStorage.getItem('photo') || '');
  const [request, setRequest] = useState(
    localStorage.getItem('request') || 'NIL'
  );

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('request', request);
  }, [name, email, request]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const [loading, setLoading] = useState(false);
  const openWidget = () => {
    setLoading(true);
    if (window.cloudinary) {
      const Widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dr8o1iapr',
          uploadPreset: 'user_uploads',
          sources: ['local', 'url', 'camera'],
          cropping: true,
          multiple: false,
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Upload success:', result.info);
            setPhoto(result.info.secure_url);
            localStorage.setItem('photo', result.info.secure_url);
          }
          setLoading(false);
        }
      );
      Widget.open();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && photo) {
      setName(e.target.value);
      setEmail(e.target.value);
      setRequest(e.target.value);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('request', request);

      showTicket();
      console.log(name);
      console.log(email);
    }
    if (!name) {
      toast.error('Enter your name', {
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000,
        role: 'alert',
      });
      e.target.blur();
    }
    if (!email) {
      toast.error('Enter your email address', {
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000,
        role: 'alert',
      });
      e.target.blur();
    }
    if (!photo) {
      toast.error('Upload your photo', {
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000,
        role: 'alert',
      });
      e.target.blur();
    }
  };

  return (
    <div>
      <form
        className="sm:border sm:border-[#0e464f] bg-[#08252b] rounded-2xl px-4 my-8 w-[300px] sm:w-[600px] -ml-2 sm:ml-4 py-6"
        autoComplete="on"
      >
        <div className="flex flex-col bg-[#052228]justify-center gap-2 border bg-[#052228] border-[#07373F] py-4 rounded-2xl my-4">
          <label className="px-4 mt-3 mb-10 font-roboto text-[16px]">
            Upload Profile Photo
          </label>
          <div className="sm:bg-[#000000]/20 flex justify-center mx-[24px] sm:mx-auto relative sm:w-[510px] h-[150px] sm:h-[200px] mb-6 group ">
            {!photo && (
              <div
                className="bg-[#0e464f] sm:w-[250px] rounded-2xl w-[200px] h-[200px] sm:h-[250px] z-10 flex flex-col justify-center items-center text-center text-[#FAFAFA]font-roboto text-[16px] cursor-pointer absolute -bottom-[22px] border-4 border-[#24a0b5]  sm:left-auto"
                onClick={openWidget}
              >
                {loading ? (
                  <>
                    <ClipLoader color="#fff" size={20} className="mr-2" />{' '}
                    Loading...
                  </>
                ) : (
                  <>
                    <img src={cloud} />
                    Drag & drop or click to <br /> upload{' '}
                  </>
                )}
              </div>
            )}
            {photo && (
              <div className="bg-[#0e464f] sm:w-[250px] rounded-2xl w-[200px] h-[200px] sm:h-[250px] z-10 flex flex-col justify-center items-center text-center text-[#FAFAFA]font-roboto text-[16px] cursor-pointer absolute -bottom-[22px] border-4 border-[#24a0b5] left-2 sm:left-auto">
                <img
                  src={photo}
                  className="rounded-xl sm:w-[250px] w-[200px] h-[200px] sm:h-[250px]"
                  alt="photo"
                />
                <div
                  className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={openWidget}
                >
                  {loading ? (
                    <>
                      <ClipLoader color="#fff" size={20} className="mr-2" />{' '}
                      Loading...
                    </>
                  ) : (
                    <>
                      <img src={cloud} />
                      Drag & drop or click to <br /> upload{' '}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className="border border-[#07373F] mt-8 mb-4" />

        <label className="font-roboto text-[16px]">Enter your name</label>
        <input
          className="border border-[#07373F] rounded-lg w-full py-2 px-4 outline-none flex justify-center mb-8 mt-2"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <div className="relative">
          <label className="my-3 font-roboto text-[16px]">
            Enter your email*
          </label>
          <input
            className="border border-[#07373F] rounded-lg px-[36px] outline-none w-full py-2 flex justify-center mb-8 mt-2 focus:outline-none focus:placeholder-transparent peer autofill:bg-[#[#02191D] autofill:text-white placeholder:pl-2 pl-[44px]"
            name="email"
            placeholder="hello@avioflagos.io"
            autoComplete="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <img src={envelope} className="absolute top-[42px] left-4 mr-4" />
        </div>
        <label className="my-3 font-roboto text-[16px]">
          {' '}
          Special request?
        </label>
        <textarea
          className="border border-[#07373F] w-full rounded-lg h-[100px] py-2 flex justify-center mb-8 mt-2 px-4 outline-none focus:outline-none focus:placeholder-transparent relative placeholder:top-2 placeholder:absolute"
          placeholder="Textarea"
          value={request}
          onChange={(e) => {
            setRequest(e.target.value);
          }}
        ></textarea>

        <div className="items-center justify-between mb-4 px-[4px] w-full flex flex-col-reverse sm:flex sm:flex-row gap-4 sm:gap-0 mt-6">
          <button
            className="py-2 px-6 border border-[#24a0b5] text-[#24a0b5] sm:w-[48%] w-full rounded-lg  cursor-pointer outline-none hover:bg-[#24a0b5] hover:text-white focus:bg-[#24a0b5] focus:text-white"
            onClick={goBack}
          >
            Back
          </button>
          <button
            className=" rounded-lg w-[100%] sm:w-[48%] cursor-pointer bg-[#24a0b5] text-white outline-none hover:bg-[#24a0b5] hover:text-white py-2 focus:bg-[#24a0b5] focus:text-white "
            onClick={handleSubmit}
          >
            Get My Free Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
