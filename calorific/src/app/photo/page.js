"use client";

import { useEffect } from "react";
import {useRouter} from "next/navigation";
// import Dynamsoft from 'dynamsoft-camera-enhancer';

export default function photos(){
    const router = useRouter();

    useEffect(() => {
        let enhancer = null;
        
       
        const initializeEnhancer = async () => {
            enhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance();
            const enhancerContainer = document.getElementById('enhancerUIContainer');
            enhancerContainer.appendChild(enhancer.getUIElement());
            await enhancer.open(true);

            const captureButton = document.getElementById('capture');
            captureButton.onclick = () => {
                if (enhancer) {
                    let frame = enhancer.getFrame();

                    let width = screen.availWidth;
                    let height = screen.availHeight;
                    let popW = 640,
                        popH = 640;
                        
                    let left = (width - popW) / 2;
                    let top = (height - popH) / 2;

                    const popWindow = window.open(
                        '',
                        'popup',
                        `width=${popW},height=${popH},top=${top},left=${left},scrollbars=yes`
                    );
                    popWindow.document.body.appendChild(frame.canvas);
                }
            };
        };

        initializeEnhancer();

        return () => {
            if (enhancer) {
                enhancer.close();
            }
        };
    }, []);

    return (
        <div className="grid place-items-center min-h-screen bg-black">
            <script src="https://unpkg.com/dynamsoft-camera-enhancer@2.1.0/dist/dce.js"></script>
            <div className="grid gap-6 text-center">
                <h1 className="text-cream-white">Quick Scan / Upload Your Meal</h1>
                <div
                    id="enhancerUIContainer"
                    style={{ height: '60vh', width: '80vw' }}
                    className="grid border border-gray-300 rounded-md"
                ></div>

                <div className="grid grid-cols-2 gap-4">
                    <a  onClick={() => router.push('/')}
                        className="text-white font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Cancel
                    </a>
                    <button
                        id="capture"
                        className="text-white font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Capture
                    </button>
                </div>
            </div>
        </div>
    );
}