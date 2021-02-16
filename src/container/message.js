import './message.css'
export const Message = ({text, theme}) => {
    
    switch (theme) {
        case "success": return (
            <p className="Success">
                {text}
            </p>
        
        )    
            
        case "error": return (
            <p className="Error">
                {text}
            </p>
        )
        

        default: <p>{text}</p>
            break;
    }
} 