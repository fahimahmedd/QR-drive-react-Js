import logo from '../../asset/image/logo.png' 

export default function MainLoader(){
    return(
        <div className='Main_Loader'>
         <div class="loading-container">
            <div class="loading"></div>
            <div id="loading-img">
                <img src={logo} alt="" />
            </div>
       </div>
    </div>
    )
}