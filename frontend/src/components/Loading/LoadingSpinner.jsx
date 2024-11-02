import React from "react";
import "./loading.css";

// function LoadingSpinner() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-black">
//       <div className="flex flex-row gap-2">
//         <div className="w-4 h-4 rounded-full bg-purple-700 animate-bounce [animation-delay:.7s]"></div>
//         <div className="w-4 h-4 rounded-full bg-purple-700 animate-bounce [animation-delay:.3s]"></div>
//         <div className="w-4 h-4 rounded-full bg-purple-700 animate-bounce [animation-delay:.7s]"></div>
//       </div>
//     </div>
//   );
// }

function LoadingSpinner() {
  return (
    /* From Uiverse.io by Nawsome */

    /* From Uiverse.io by Nawsome */
    <div class =" abc">
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        class="wheel-and-hamster"
      >
        <div class="wheel"></div>
        <div class="hamster">
          <div class="hamster__body">
            <div class="hamster__head">
              <div class="hamster__ear"></div>
              <div class="hamster__eye"></div>
              <div class="hamster__nose"></div>
            </div>
            <div class="hamster__limb hamster__limb--fr"></div>
            <div class="hamster__limb hamster__limb--fl"></div>
            <div class="hamster__limb hamster__limb--br"></div>
            <div class="hamster__limb hamster__limb--bl"></div>
            <div class="hamster__tail"></div>
          </div>
        </div>
        <div class="spoke"></div>
      </div>
    </div>
  );
}


export default LoadingSpinner;
