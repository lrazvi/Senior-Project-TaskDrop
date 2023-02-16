import  React,  {  useMemo  }  from  "react";
import  {  animated,  useTransition  }  from  'react-spring';
import '../style.css'

const  Message  =  ({message, onMessageEnded = () => {}})  =>  {
    const  items  =  useMemo(
      ()  =>
      message.split('').map((letter, index)  =>  ({
          item:  letter,
          key: index,
        })),
      [message]
    );
  
    const  transitions  =  useTransition(items,  {
      trail:  35,
      from:  { display:  "none"  },
      enter:  { display:  ""  },
      onRest: (item) => {
        if (item.key === items.length - 1) {
            onMessageEnded();
        }
      }
    });
  
    return  (
      <div  className="DialogMessage">
        {transitions((props, { item, key }) => {
          return (
            <animated.span  key={key} style = {props}>
              {item}
            </animated.span>
          );
        })}
      </div>
    );
  };
  export  default  Message;

