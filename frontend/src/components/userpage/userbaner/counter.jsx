function Counter(props)
{
    const { title, count, ...others } = props;
    return(
        <div class="flex flex-col justify-end pr-6">
            <div>{title}</div>
            <div class="font-bold text-lg">{count}</div>
        </div>
    )
}

export default Counter;