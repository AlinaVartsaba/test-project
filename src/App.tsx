import React, {Component} from 'react';
import Button from './components/Button/Button';
import FileSaver from 'file-saver';

type ModifiedData = {
    id: string,
    name: string,
    sortOrder: number,
    color: string,
}

interface IState {
    data: Array<ModifiedData>,
}


export default class App extends Component<{}, IState> {

    state = {
        data: [] as Array<ModifiedData>
    }

    componentDidMount() {
        fetch('./data.json')
            .then((response) => response.json())
            .then((data) => {
                const dataKeys = Object.keys(data);
                let dt: Array<ModifiedData> = [];

                dataKeys.forEach(key => {
                    const row: ModifiedData = {
                        id: key,
                        name: data[key].name,
                        sortOrder: data[key].sortOrder,
                        color: data[key].style.color,
                    };

                    dt.push(row);
                });

                dt.sort((a, b) => b.sortOrder - a.sortOrder);

                this.setState({
                    data: dt
                })
            })
    }

    private onSave = () => {
        const {data} = this.state;
        const blob = new Blob([JSON.stringify(data)], {
            type: 'application/json',
        });
        FileSaver.saveAs(blob, 'modified-data.json');
    }

    render() {
        const {data} = this.state;

        return (
            <div>
                <ol>
                    {data.map(item => <li key={item.id} style={{color: item.color}}>{`${item.id} - ${item.name}`}</li>)}
                </ol>
                <Button onClick={this.onSave}/>
            </div>
        );
    }
}
