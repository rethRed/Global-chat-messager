
interface IProps {
    title: string 
}

export default function  TitleComponent({title} : IProps){
    return (
        <div className="h1">
            {title}
        </div>
    )
}