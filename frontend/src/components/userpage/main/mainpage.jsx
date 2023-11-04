import ScrobbleRow from "./scrobbleRow";
import Card from "./card";
import Comment from "./comment";
import AppLogo from "../../../assets/icons/logo.png";
import Belmondo from "../../../assets/icons/belmondo.png";
function MainPage(){
    return(
        <div class="flex h-[80%] text-slate-200">
            <div class="w-[63%] p-6 overflow-scroll h-[100%]">
                Artist<br/>
                <div class="flex w-[100%] space-x-4 mt-4 mb-4">
                <Card cover={AppLogo} mainText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Kaz Balagane" rating="5.5" heart="heart"/> 
                <Card cover={AppLogo} mainText="Kaz Balagane" rating="5.5" heart="heart"/> 
                <Card cover={AppLogo} mainText="Kaz Balagane" rating="5.5" heart="heart"/> 
                <Card cover={AppLogo} mainText="Kaz Balagane" rating="5.5" heart="heart"/>   
                <Card cover={AppLogo} mainText="Kaz Balagane" rating="5.5" heart="heart"/>              
                </div>               
                Album<br/>
                <div class="flex w-[100%] space-x-4 mt-4 mb-4">
                <Card cover={AppLogo} mainText="Narkopop" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Narkopop" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Narkopop" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Narkopop" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Narkopop" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Narkopop" secText="Kaz Balagane" rating="5.5" heart="heart"/>


                </div>
                Song<br/>
                <div class="flex w-[100%] space-x-4 mt-4 mb-4">
                <Card cover={AppLogo} mainText="Chaczapuri" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Chaczapuri" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Chaczapuri" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Chaczapuri" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Chaczapuri" secText="Kaz Balagane" rating="5.5" heart="heart"/>
                <Card cover={AppLogo} mainText="Chaczapuri" secText="Kaz Balagane" rating="5.5" heart="heart"/>


                </div>
                
                Comments<br/>
                <div class="flex h-[10%] pb-4 mt-4 mb-4">
                    <input type="text" class="border border-slate-700 w-[100%]"/>
                    <button class="border border-slate-700 ml-4 p-4">Send</button>
                </div>
                <Comment avatar={Belmondo} username="janpawel2" comment="nigdy bym czegos takiego nie zrobil" date="02.04.2005"/>
            </div>
            <div class="border-l-2 w-[37%] p-6 h-[100%]">
                Scrobbles
                <div class="flex flex-col space-y-2 mt-2">
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                <ScrobbleRow albumCover="cover" heart="heart" title="Chaczapuri" artist="Kaz Bałagane" rating="5/5" date="5 sec ago"/>
                </div>
            </div>
        </div>
    )
}
export default MainPage;