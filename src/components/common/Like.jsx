const Like = (props) => {
    let likeClass = "fa fa-heart";
    likeClass = props.movie.liked ? likeClass : likeClass+="-o"; 
    return ( 
        <i className={likeClass} style={{ cursor:"pointer"}}  onClick={()=>props.onClick(props.movie)}></i>
     );
}

 
export default Like;