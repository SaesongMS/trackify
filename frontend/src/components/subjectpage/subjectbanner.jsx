import Avatar from "../userpage/userbanner/avatar";
import SubjectInfoBar from "./subjectinfobar";
import { createEffect, createSignal } from "solid-js";

function SubjectBanner(props) {

    const [bannerImage, setbannerImage] = createSignal(null);
    const [subject, setsubject] = createSignal(null);

    createEffect(() => {
        setbannerImage(props.subjectSecondaryImage);
        setsubject(props.subject);
    }, [props]);

    return (
        <div class="flex flex-row">
            <div class="border border-slate-700  max-w-[15%]">
                <img class="" src={`data:image/png;base64,${props.subjectImage}`}/>
            </div>
            <div class="flex flex-col flex-grow">
            <SubjectInfoBar
                image={bannerImage()}
                primaryText={props.primaryText}
                secondaryText={props.secondaryText}
                scrobbleCount={props.scrobbleCount}
                usersCount={props.usersCount}
                subject={subject()}
            />
            </div>
        </div>
        );
}

export default SubjectBanner;
