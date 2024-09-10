function Button ({content, onClick}) {
    return (
        <button className="button" onClick={onClick}>{content}</button>
    );
}