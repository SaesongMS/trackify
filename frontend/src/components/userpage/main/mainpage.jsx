import ScrobbleRow from "./scrobbleRow";
import Card from "./card";
import Comment from "./comment";
import AppLogo from "../../../assets/icons/logo.png";
function MainPage(){
    return(
        <div class="flex h-[80%]">
            <div class="w-[63%] p-6 overflow-scroll h-[100%]">
                Artist<br/>
                <div class="flex w-[100%]">
                <Card cover={AppLogo} mainText="Kaz Balagane" rating="5.5" heart="heart"/>               
                </div>               
                Album<br/>
                <Card cover={AppLogo} mainText="Narkopop" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                Song<br/>
                <Card cover={AppLogo} mainText="Chaczapuri" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                Comments<br/>
                <input type="text" class="border border-slate-700 w-[100%] h-[10%]"/>
                <button class="border border-slate-700">Send</button>
                <Comment avatar="avatar" username="janpawel2" comment="nigdy bym czegos takiego nie zrobil" date="02.04.2005"/>
            </div>
            <div class="border-l-2 w-[37%] p-6 h-[100%]">
                Scrobbles
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
            </div>
        </div>
    )
}
export default MainPage;