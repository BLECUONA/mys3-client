import React, { useState, useEffect } from 'react';
import { Items } from '../res/localStorageItems';
import DashboardView from './DashboardView';

const Dashboard: React.FC = () => {
    const [nickname, setNickname] = useState<string | null>('');

    useEffect(() => {
        setNickname(localStorage.getItem(Items.nickname));
    }, []);

    return (
        <DashboardView
            nickname={nickname}
        />
    );
};

export default Dashboard;