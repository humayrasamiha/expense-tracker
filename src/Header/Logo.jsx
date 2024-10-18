import LogoImg from "../assets/image/favicon.svg";

export default function Logo(){
    return (
        <div>
          <img src={LogoImg} className="h-14" />
        </div>
    );
}