import React, {ChangeEvent} from 'react';

type PropsType = {
    status: string | null
    updateStatus: (status: string | null) => void
}
type StateType = {
    editMode: boolean
    status: string | null
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status,
    }
    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }


    render() {
        return (
            <div>
                {this.state.editMode ?
                    <div>
                        <input onChange={this.onStatusChange} type="text" onBlur={this.deactivateEditMode} autoFocus={true}
                            // @ts-ignore
                               value={this.state.status}/>
                    </div>
                    :
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.state.status || "not status"}</span>
                    </div>}
            </div>
        )
    }
}

export default ProfileStatus;